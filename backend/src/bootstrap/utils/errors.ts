// src/bootstrap/utils/errors.ts

export class BootstrapError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, any>,
  ) {
    super(message);
    this.name = "BootstrapError";
  }
}

export class MigrationError extends BootstrapError {
  constructor(
    message: string,
    public readonly migrationId: string,
    public readonly migrationName: string,
    details?: Record<string, any>,
  ) {
    super(message, "MIGRATION_ERROR", {
      migrationId,
      migrationName,
      ...details,
    });
    this.name = "MigrationError";
  }
}

export class DependencyError extends MigrationError {
  constructor(
    migrationId: string,
    migrationName: string,
    public readonly missingDependency: string,
  ) {
    super(
      `Dependency not met: ${missingDependency}`,
      migrationId,
      migrationName,
      { missingDependency },
    );
    this.name = "DependencyError";
  }
}

export class EntityError extends BootstrapError {
  constructor(
    message: string,
    public readonly entityType: string,
    public readonly entityId?: string | number,
    details?: Record<string, any>,
  ) {
    super(message, "ENTITY_ERROR", {
      entityType,
      entityId,
      ...details,
    });
    this.name = "EntityError";
  }
}

export class ValidationError extends BootstrapError {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: any,
    details?: Record<string, any>,
  ) {
    super(message, "VALIDATION_ERROR", {
      field,
      value,
      ...details,
    });
    this.name = "ValidationError";
  }
}

export interface ErrorReport {
  timestamp: string;
  error: BootstrapError;
  context: {
    environment: string;
    nodeEnv: string;
    strapiVersion: string;
  };
  stack?: string;
}

export class ErrorReporter {
  private static instance: ErrorReporter;
  private errors: ErrorReport[] = [];

  private constructor() {}

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  reportError(error: BootstrapError, context: Record<string, any> = {}): void {
    const report: ErrorReport = {
      timestamp: new Date().toISOString(),
      error,
      context: {
        environment: process.env.NODE_ENV || "development",
        nodeEnv: process.env.NODE_ENV || "development",
        strapiVersion: process.env.STRAPI_VERSION || "unknown",
        ...context,
      },
      stack: error.stack,
    };

    this.errors.push(report);
    this.logError(report);
  }

  private logError(report: ErrorReport): void {
    const { error, context, timestamp } = report;

    console.error("\n🚨 Bootstrap Error Report:");
    console.error("----------------------------------------");
    console.error(`Time: ${timestamp}`);
    console.error(`Type: ${error.name}`);
    console.error(`Code: ${error.code}`);
    console.error(`Message: ${error.message}`);

    if (error instanceof MigrationError) {
      console.error(`Migration: ${error.migrationName} (${error.migrationId})`);
    }

    if (error instanceof EntityError) {
      console.error(
        `Entity: ${error.entityType}${error.entityId ? ` (ID: ${error.entityId})` : ""}`,
      );
    }

    if (error instanceof ValidationError) {
      console.error(`Field: ${error.field}`);
      console.error(`Value: ${JSON.stringify(error.value)}`);
    }

    if (error.details) {
      console.error("Details:", error.details);
    }

    console.error("Context:", context);
    console.error("----------------------------------------\n");
  }

  getErrors(): ErrorReport[] {
    return this.errors;
  }

  clearErrors(): void {
    this.errors = [];
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrorSummary(): string {
    if (!this.hasErrors()) {
      return "No errors occurred during bootstrap.";
    }

    const errorCounts = this.errors.reduce(
      (acc, report) => {
        const type = report.error.name;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const summary = Object.entries(errorCounts)
      .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
      .join(", ");

    return `Bootstrap completed with ${this.errors.length} error${this.errors.length > 1 ? "s" : ""}: ${summary}`;
  }
}
