-- Optimizes email queuing (compares less rows)
CREATE INDEX idx_email_processed
ON email_queue (processed)