import { styled } from 'styled-components';
export function AboutPlugin() {
    return (
    <AboutPluginWrapper>
        <h2>About RE/beehiiv</h2>
        <p>Boost your productivity with our streamlined plugin, designed to simplify your workflow and integrate seamlessly with your favorite tools. Whether you're automating tasks, tracking key metrics, or improving efficiency, this plugin delivers the flexibility and ease you need to stay focused on what matters most. Get started today and experience a smarter, more effective way to work.</p>
    </AboutPluginWrapper>
    );
};

const AboutPluginWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    & > * {
        flex: 1;
        margin:0;
    }
`;

const PluginInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
    align-items: center;
    & > * {
        margin: 0;
    }
`;