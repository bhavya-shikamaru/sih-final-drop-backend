# Research & Design Decisions: Adaptive Risk Thresholds

## Topic: Architecture for Configuration Management

### Research Task
Investigate the best approach to introduce configuration management (for risk thresholds) into the existing layered architecture.

### Options Considered

1.  **Integrate into existing `RiskService`**:
    - **Description**: Add methods like `getThresholds`, `updateThreshold` directly to the `RiskService` and its corresponding repository.
    - **Pros**: Fewer new files. Keeps all risk-related logic physically co-located.
    - **Cons**: Violates the Single Responsibility Principle (SRP). The `RiskService` would be responsible for both its core business logic (calculating risk) and the separate concern of CRUD operations for configuration data. This would increase its complexity and make it harder to test and maintain.

2.  **Create a new dedicated `ConfigService`**:
    - **Description**: Create a new, vertical slice for configuration management (`config.model.ts`, `config.repository.ts`, `config.service.ts`, `config.controller.ts`). The `RiskService` would then call the `ConfigService` to fetch threshold values.
    - **Pros**:
        - **Adheres to Constitution**: Perfectly aligns with Principle II (Layered Architecture) and Separation of Concerns.
        - **Clean & Scalable**: `ConfigService` is responsible only for managing configuration. `RiskService` is responsible only for calculating risk. The dependency is clear and one-way.
        - **Testability**: `ConfigService` and `RiskService` can be tested independently.
    - **Cons**: Requires creating a few more files (boilerplate).

---

## Decision

**Decision**: **Option 2: Create a new dedicated `ConfigService`**

**Rationale**: This approach is chosen because it strictly adheres to the project's established architectural principles (Layered Architecture, Separation of Concerns). The small cost of additional files is heavily outweighed by the long-term benefits of improved maintainability, scalability, and testability. The `RiskService` will become a *consumer* of the `ConfigService`, which is a clean and robust design pattern.
