import { ComboBox, ComboBoxItem, ComboBoxSection, Header, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>();

    function handleSelectionChange(key: Key | null) {
        if (selectedKey === key) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    }

    return (
        <ComboBox selectedKey={selectedKey} onSelectionChange={handleSelectionChange} label="Roles">
            <ComboBoxSection key="1">
                <Header>Operations</Header>
                <ComboBoxItem id="1">Project Coordinator</ComboBoxItem>
                <ComboBoxItem id="2">QA Specialist</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxItem key="2" id="3">Manager</ComboBoxItem>
        </ComboBox>
    );
}
