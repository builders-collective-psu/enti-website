import { createFeedbackMiddleware } from '../scripts/feedback-server.mjs';

const handler = createFeedbackMiddleware();
export default function feedback(req, res) {
  // Serverless deployment needs an explicitly configured persistent volume.
  if (!process.env.FEEDBACK_DATA_DIR) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Feedback storage is not configured on this deployment. Please copy your note and share it directly.' }));
    return;
  }
  return handler(req, res);
}
