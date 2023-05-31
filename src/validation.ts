export interface Status {
	valid: boolean;
	message?: string;
}

type Rule = (value: string) => Status;

export const required: Rule = (value: string): Status => {
	const result = Boolean(value);
	return {
		valid: result,
		message: result ? undefined : "This field is required",
	};
}

export function lenth({min, max}: {min: number, max:number}): Rule {
	return (value: string): Status => {
    const result = Boolean(value.length >= min && value.length <= max)
    return {
			valid: result,
			message: result ? undefined : `This field's length must be between ${min} and ${max}`,
		};
  }
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      return result
    }
  }

	return {
		valid: true,
	};
}