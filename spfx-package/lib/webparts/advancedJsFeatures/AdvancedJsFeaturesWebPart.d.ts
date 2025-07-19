import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IAdvancedJsFeaturesWebPartProps {
    description: string;
    title: string;
}
export default class AdvancedJsFeaturesWebPart extends BaseClientSideWebPart<IAdvancedJsFeaturesWebPartProps> {
    render(): void;
    private _isDarkTheme;
    private _environmentMessage;
    protected onInit(): Promise<void>;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: any | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
