export const glossaries = {
	'A/B Test': 'A method of comparing two versions of a feature to determine which performs better.',
	'Audit Log': 'A record of all changes made to feature flags for compliance and debugging.',
	'Blue-Green Deployment':
		'A deployment technique that uses two identical production environments to reduce downtime.',
	'Canary Release':
		'A deployment strategy where a new version is rolled out to a small subset of users first.',
	Configuration: 'The settings and rules that determine how feature flags behave.',
	Dashboard: 'The user interface for managing feature flags and viewing analytics.',
	Environment: 'A deployment stage such as development, staging, or production.',
	Evaluation:
		'The process of determining whether a feature flag should be enabled for a specific user or context.',
	Fallback: 'The default behavior when a feature flag cannot be evaluated.',
	'Feature Flag':
		'A software development technique that allows developers to turn features on or off without deploying new code.',
	Flag: 'Short for feature flag, a conditional statement that controls feature availability.',
	'Flag State':
		'The current status of a feature flag (enabled, disabled, or conditionally enabled).',
	'Kill Switch': 'A feature flag that can quickly disable a feature if problems arise.',
	Override: 'Manually setting a flag value for specific users or contexts, bypassing normal rules.',
	'Percentage Rollout': 'Enabling a feature for a specific percentage of users.',
	Rollout: 'The process of gradually releasing a feature to users, often using feature flags.',
	SDK: 'Software Development Kit - libraries that integrate feature flag functionality into applications.',
	Segment: 'A group of users defined by shared characteristics used for feature targeting.',
	Targeting: 'The ability to show features to specific users or groups based on defined criteria.',
	Toggle:
		'Another term for feature flag, referring to the ability to switch functionality on or off.'
} as const;

export type GlossaryKey = keyof typeof glossaries;
