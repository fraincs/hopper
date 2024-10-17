import { Radio, RadioField, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles" description="Select one to continue">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <RadioField>
                <Radio value="manager">Manager</Radio>
            </RadioField>
        </RadioGroup>
    );
}
