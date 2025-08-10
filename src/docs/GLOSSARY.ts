export const glossaries = {
	// Flag Types and Data Structures
	BOOLEAN: 'Simple true/false flag type for basic feature toggles and kill switches.',
	INTEGER: 'Numeric flag type for configuration values with optional min/max constraints.',
	STRING: 'Text-based flag type with optional length limits and regex pattern validation.',
	ENUM: 'Single-selection flag type allowing one value from a predefined set of options.',
	TAG: 'Multi-selection flag type allowing arrays of values from predefined options.',
	'AB-TEST': 'A/B testing flag type that returns "A" or "B" based on percentage distribution.',

	// FlagFlow System Architecture
	etcd: "Distributed key-value store used as FlagFlow's primary data storage backend.",
	StatefulSet: 'Kubernetes deployment type used for etcd in production environments.',
	'Watch API':
		"etcd's real-time change notification mechanism that FlagFlow leverages for live updates.",
	'HTTP/2 streaming': "Protocol used by etcd's watch mechanism for low-latency flag updates.",
	'RAFT consensus algorithm':
		'Distributed consistency algorithm used by etcd for data reliability.',

	// Authentication and Authorization
	'Built-in User Management':
		"FlagFlow's simple session-based authentication system for small to medium deployments.",
	'Keycloak Integration':
		'Enterprise authentication using OAuth 2.0/OpenID Connect with external identity providers.',
	'Single Sign-On (SSO)':
		'Authentication method allowing users to access multiple applications with one login.',
	'OAuth 2.0/OpenID Connect': 'Modern authentication protocols used with Keycloak integration.',
	'Session-based authentication':
		'Authentication method using server-side sessions and HTTP cookies.',

	// Permissions System
	'flag-create': 'Permission to create, rename, move, and delete feature flags.',
	'flag-schema': 'Permission to modify flag data types, properties, and validation rules.',
	'flag-value': 'Permission to update flag values and states across environments.',
	users: 'Permission to manage user accounts, sessions, and permissions.',
	migration: 'Permission to execute data migrations, backups, and restore operations.',

	// Migration and Data Management
	'File-based Migration': 'Migration method using exported JSON files from source environment.',
	'Remote Migration': 'Direct migration between FlagFlow instances over network connection.',
	Export: 'Process of creating backup files containing complete flag configuration.',
	Restore: 'Process of recovering flag configuration within the same environment from backups.',
	'Migration Steps': 'Specific operations generated to synchronize environments safely.',
	CREATE_DEFAULTVALUE: 'Migration step to create new flag with its default value.',
	UPDATE_SCHEMA_DEFAULTVALUE: 'Migration step to update flag schema and reset to default value.',
	SET_VALUE: 'Migration step to set specific value for existing flag.',
	DELETE: "Migration step to remove flag that doesn't exist in source environment.",

	// TypeScript Integration
	'Type Safety': 'Compile-time guarantee that flag operations use correct data types.',
	'Hash Validation': 'SHA-1 based system ensuring client-server type consistency.',
	'Zod Schema': 'Runtime validation schemas automatically generated from flag definitions.',
	IntelliSense: 'IDE autocompletion and type hints for flag names and values.',
	'x-accept-flaggroup-hash': 'HTTP header sent by client with expected schema hash.',
	'x-flaggroup-hash': 'HTTP header sent by server with current schema hash.',
	'409 Conflict': "HTTP status returned when client and server schema hashes don't match.",

	// Environment and Configuration
	'Environment Variables': 'Configuration method using system environment variables.',
	ETCD_SERVER: 'Environment variable specifying etcd server endpoint.',
	ETCD_NAMESPACE: 'Environment variable for data isolation in shared etcd clusters.',
	SESSION_USERS_ENABLED: 'Environment variable controlling built-in user management.',
	KEYCLOAK_HOST: 'Environment variable specifying Keycloak server URL.',
	MIGRATION_SOURCE_URL: 'Environment variable for remote migration configuration.',

	// Development and Operations
	'Flag Hierarchy':
		'Organizational structure using forward slashes as separators (e.g., ui/header/logo).',
	'Default Values':
		'Initial values assigned to flags when created, used when no explicit value is set.',
	'Value Existence': 'Boolean indicator whether a flag has been explicitly set or uses default.',
	'Cache TTL': 'Time-to-live setting for cached flag values in client applications.',
	'Bitnami etcd': 'Specific etcd Docker image used in FlagFlow documentation and examples.',
	'Container Engine': 'Docker or Kubernetes runtime environment for FlagFlow deployment.',

	// Advanced Features
	'Percentage Rollout': 'Gradual feature release to subset of users based on percentage.',
	'Circuit Breaker': 'Emergency flag to quickly disable problematic features.',
	'Audit Logging': 'Comprehensive recording of all administrative operations for security.',
	'Metrics Collection': 'Prometheus-compatible monitoring data collection.',
	'Fallback Strategy': 'Graceful degradation when flags are unavailable or malformed.',
	'Schema Drift': 'Gradual changes in flag definitions over time requiring synchronization.',

	// Error Handling and Troubleshooting
	'Validation Errors': "Runtime errors when flag data doesn't match expected schema.",
	'Hash Mismatch': 'Error condition when client and server schemas are out of sync.',
	'Safe Parsing': 'Error-resistant data validation that returns success/failure results.',
	'Environment Mismatch': 'Error when trying to restore backup to wrong environment.',
	'Dependency Validation': 'Checking that migration steps can be executed in correct order.',

	// General Feature Flag Concepts
	Configuration: 'The settings and rules that determine how feature flags behave.',
	Environment: 'A deployment stage such as development, staging, or production.',
	Flag: 'Short for feature flag, a conditional statement that controls feature availability.',
	'A/B Test': 'A method of comparing two versions of a feature to determine which performs better.',
	'Audit Log': 'A record of all changes made to feature flags for compliance and debugging.',
	'Blue-Green Deployment':
		'A deployment technique that uses two identical production environments to reduce downtime.',
	'Canary Release':
		'A deployment strategy where a new version is rolled out to a small subset of users first.',
	Dashboard: 'The user interface for managing feature flags and viewing analytics.',
	Evaluation:
		'The process of determining whether a feature flag should be enabled for a specific user or context.',
	Fallback: 'The default behavior when a feature flag cannot be evaluated.',
	'Feature Flag':
		'A software development technique that allows developers to turn features on or off without deploying new code.',
	'Flag State':
		'The current status of a feature flag (enabled, disabled, or conditionally enabled).',
	'Kill Switch': 'A feature flag that can quickly disable a feature if problems arise.',
	Override: 'Manually setting a flag value for specific users or contexts, bypassing normal rules.',
	Rollout: 'The process of gradually releasing a feature to users, often using feature flags.',
	SDK: 'Software Development Kit - libraries that integrate feature flag functionality into applications.',
	Segment: 'A group of users defined by shared characteristics used for feature targeting.',
	Targeting: 'The ability to show features to specific users or groups based on defined criteria.',
	Toggle:
		'Another term for feature flag, referring to the ability to switch functionality on or off.'
} as const;

export type GlossaryKey = keyof typeof glossaries;
