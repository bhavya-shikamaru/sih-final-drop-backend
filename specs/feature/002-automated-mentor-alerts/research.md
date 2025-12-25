# Research & Design Decisions: Automated Mentor Alerts

## Topic: Email Notification Implementation

### Research Task
Investigate best practices for sending emails from a Node.js application, focusing on the `nodemailer` library. Key areas of concern are credential management and testing in a development environment.

### Options Considered

1.  **Use a third-party email API service (e.g., SendGrid, Mailgun)**:
    - **Pros**: Highly reliable, scalable, provides analytics.
    - **Cons**: Introduces a hard dependency on an external paid service. More complex setup for a simple notification feature. Overkill for the current MVP.
2.  **Use `nodemailer` with a real SMTP account (e.g., Gmail)**:
    - **Pros**: Direct control, uses standard SMTP.
    - **Cons**: Requires storing real account credentials, which is a security risk if not handled properly. Gmail has sending limits and may block sign-in attempts from servers.
3.  **Use `nodemailer` with a mock/test service**:
    - **Pros**: No need for real credentials. Allows for easy and free end-to-end testing of the email sending flow.
    - **Cons**: Emails are not sent to a real inbox, but a temporary, public one.

---

## Decision

**Decision**: **Option 3: Use `nodemailer` with Ethereal for development, and standard SMTP for production.**

**Rationale**: This approach provides the best balance of security, cost, and developer experience.
- **Development**: By using `nodemailer.createTestAccount()`, we can get free, on-the-fly SMTP credentials from **Ethereal**. Emails are sent to a temporary web inbox, allowing developers to view the final rendered email without needing a real email server. This is perfect for testing the content and formatting of the alerts. If Ethereal is unavailable, the system will fall back to logging the email content to the console.
- **Production**: The system will be configured via environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) to use a standard, production-grade SMTP service.
- **Security**: This avoids committing any real credentials to the repository and follows the 12-factor app methodology for configuration.
