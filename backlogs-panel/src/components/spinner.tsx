import * as React from "react";

export class SpinnerComponent extends React.Component<void, void> {
    public render(): JSX.Element {
        return <div className="indicator">
            <div className="spinner bowtie-icon bowtie-spinner"></div>
        </div>;
    }
}