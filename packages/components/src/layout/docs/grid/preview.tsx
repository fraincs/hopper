import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid autoFlow="column">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}
