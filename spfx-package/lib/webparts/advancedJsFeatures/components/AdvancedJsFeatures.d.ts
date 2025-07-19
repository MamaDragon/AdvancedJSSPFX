import * as React from 'react';
import { IAdvancedJsFeaturesProps } from './IAdvancedJsFeaturesProps';
import './AdvancedJsFeatures.module.scss';
export interface IAdvancedJsFeaturesState {
    activeComponent: string;
}
export default class AdvancedJsFeatures extends React.Component<IAdvancedJsFeaturesProps, IAdvancedJsFeaturesState> {
    constructor(props: IAdvancedJsFeaturesProps);
    private setActiveComponent;
    private renderHomeComponent;
    private renderActiveComponent;
    render(): React.ReactElement<IAdvancedJsFeaturesProps>;
}
