import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { TELEMETRY_CLIENT_KEY, TELEMETRY_ENDPOINT } from "../Game/Data/data";
import { persistentSequence, type Sequence } from "./sequence_generator";
import generateUUID from "./uuid";
import type { Action as GameStateDispatchAction } from "../Game/Data";
import type * as FeedbackSurvey from "../Views/welcome/feedback_form";

export type TelemetryAction =
  | {
      kind: "WindowingToplevelChange";
      window: {
        title: string;
      } | null;
    }
  | { kind: "GameStateDispatchAction"; action: GameStateDispatchAction }
  | {
      kind: "FeedbackSurvey";
      survey: {
        overallSatisfaction: FeedbackSurvey.Satisfaction;
        bugsEncountered: string;
        suggestions: string;
        wouldRecommend: boolean;
        navigationIntuitive: FeedbackSurvey.TriIntensity;
        navigationDifficulty: string;
        termsClear: FeedbackSurvey.TriIntensity;
        topicSuggestion: string;
      };
    };

export interface Frame {
  /**
   * Number of milliseconds since the UNIX epoch (i.e. Date.now())
   */
  timestamp: number;
  sequence: Sequence;
  content: TelemetryAction;
}

/**
 * Sends a batch of telemetry frames to the configured endpoint.
 */
async function doPost(batch: Frame[], userId: string) {
  await fetch(TELEMETRY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
      Authorization: TELEMETRY_CLIENT_KEY,
    },
    body: JSON.stringify(batch),
  });
}

const context = createContext<((a: TelemetryAction) => void) | null>(null);

// Configuration constants
const THRESHOLD = 10;
const INTERVAL_MS = 5000; // 5 seconds

export function TelemetryProvider(props: PropsWithChildren) {
  const queueRef = useRef([] as Frame[]);
  const nextSequenceRef = useMemo(() => persistentSequence("telemetry_sequence"), []);
  const userId = useMemo(() => {
    const stored = localStorage.getItem("telemetry_user");
    if (stored === null) {
      const newId = generateUUID();
      localStorage.setItem("telemetry_user", newId);
      return newId;
    }
    return stored;
  }, []);

  // Function to flush the telemetry queue.
  const flushQueue = useCallback(async () => {
    if (queueRef.current.length === 0) return;

    // Remove the current batch from the queue.
    const batch = queueRef.current;
    queueRef.current = [];
    try {
      await doPost(batch, userId);
    } catch (err) {
      // On failure, restore the batch at the beginning of the queue.
      queueRef.current = batch.concat(queueRef.current);
      // Optionally log the error, e.g.:
      // console.error("Failed to send telemetry", err);
    }
  }, [userId]);

  // The public API to push telemetry actions.
  const push = useCallback(
    (action: TelemetryAction) => {
      const frame: Frame = {
        timestamp: Date.now(),
        sequence: nextSequenceRef(),
        content: action,
      };

      queueRef.current.push(frame);

      if (queueRef.current.length >= THRESHOLD) {
        flushQueue();
      }
    },
    [flushQueue, nextSequenceRef]
  );

  // Periodically flush the queue.
  useEffect(() => {
    const intervalId = setInterval(() => {
      flushQueue();
    }, INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [flushQueue]);

  return <context.Provider value={push}>{props.children}</context.Provider>;
}

export function useTelemetry() {
  const push = useContext(context);

  if (push === null) throw new Error("This must be used within a <TelemetryProvider />.");

  return push;
}
