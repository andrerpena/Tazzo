import * as React from "react";
import ReactSelect from "react-select";
import * as ReduxForm from "redux-form";
import { socialLinks } from "../../data/socialLinks";
import { SocialLinkValue } from "../../typings";

interface SelectSocialLinkProps extends ReduxForm.WrappedFieldProps {
    placeholder: string;
    disabled?: boolean;
    selectedSocialLinks?: SocialLinkValue[];
    index?: number;
}

class SelectSocialLink extends React.Component<SelectSocialLinkProps, {}> {

    static defaultProps = {
        disabled: false,
    };

    private handleChange = (value: { value: string, label: string }) => {
        const {onChange} = this.props.input;
        onChange(value.value as any);
    }

    private renderOption = (option: any) => {
        return <span> <i className={option.iconClass} style={{width: 20}}/> {option.label}</span>;
    }

    public render() {
        const {input: {value, onBlur}, meta: {error, touched}, placeholder, disabled, selectedSocialLinks, index} = this.props;
        const className = error && touched ? "invalid" : "";

        const options = socialLinks.map((sl) => ({
            value: sl.value,
            label: sl.label,
            iconClass: sl.iconClass,
        })).sort((a, b) => {
            if (a.value < b.value) return -1;
            if (a.value > b.value) return +1;
            return 0;
        }).filter((sl) => (selectedSocialLinks && index)
            ? selectedSocialLinks.findIndex(((ssl, i) => ssl.website === sl.value && i !== index)) === -1
            : true);

        const props = {
            value,
            options,
            labelKey: "label",
            valueKey: "value",
            placeholder: placeholder || "",
            loadingPlaceholder: "Localizando endereço...",
            searchPromptText: "Digite para pesquisar",
            noResultsText: "Não foi possível encontrar o endereço",
            ignoreCase: false,
            ignoreAccents: false,
            cache: false,
            className,
            onChange: this.handleChange,
            optionRenderer: this.renderOption,
            disabled,
            onBlur: () => onBlur(value),
        };

        return (
            <ReactSelect {...props} />
        );
    }
}

export { SelectSocialLink };
