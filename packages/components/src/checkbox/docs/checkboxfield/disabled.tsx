import { Checkbox, CheckboxField } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxField isDisabled description="Team Manager">
            <Checkbox>Manager</Checkbox>
        </CheckboxField>
    );
}
