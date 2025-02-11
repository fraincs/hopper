import { Card, Content, Div, H3, Header, Img, Text } from "@hopper-ui/components";

import SpaceLandscape from "./assets/space-landscape.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
            <Header borderTopLeftRadius="inherit" borderTopRightRadius="inherit" overflow="hidden">
                <Div UNSAFE_height="8rem">
                    <Img src={SpaceLandscape.src} alt="Space landscape" objectFit="cover" width="100%" height="100%" />
                </Div>
                <H3 paddingTop="inset-lg" paddingLeft="inset-lg" paddingRight="inset-lg">NASA Headquarters</H3>
            </Header>
            <Content paddingBottom="inset-lg" paddingLeft="inset-lg" paddingRight="inset-lg">
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Content>
        </Card>
    );
}
