import { fishSpecies } from "./fish";



export const fishSchema = [
    {
        name: "facilityId",
        type: "text",
        label: "Facility id",
        placeholder: "",
        showTooltip: false,
        tooltipText: "",
        readOnly: true,
        validation: null,
    },
    {
        name: "catchDate",
        type: "date",
        label: "Catch date",
        showTooltip: false,
        tooltipText: "",
        readOnly: false,
        defaultValue:  "" ,//(new Date()).toISOString(),
        validationType: "string",
        validations: []
    },

    {
        name: "species",
        type: "select",
        label: "Species",
        placeholder: "Select species",
        showTooltip: false,
        tooltipText: "",
        readOnly: false,
        options: [
            ...fishSpecies
        ],
        validationType: "string",
        validations: [
            {
                type: "required",
                params: ["This field is required"]
            },
        ]
    },
    {
        name: "amount",
        type: "number",
        label: "Amount, Kg",
        placeholder: "",
        showTooltip: false,
        tooltipText: "",
        readOnly: false,
        validationType: "string",
        validations: [
            {
                type: "required",
                params: ["This field is required"]
            },
            // {
            //     type: "min",
            //     params: [2, "Cannot be less than 1"]
            // },
            // {
            //     type: "max",
            //     params: [9999999999, "phone number cannot be more than 10 characters"]
            // },
        ]
    },
    {
        name: "batchNumber",
        type: "number",
        label: "Batch number",
        placeholder: "",
        showTooltip: false,
        tooltipText: "",
        readOnly: false,
        validationType: "string",
        validations: [
            {
                type: "required",
                params: ["This field is required"]
            },
            // {
            //     type: "min",
            //     params: [2, "Cannot be less than 1"]
            // },
            // {
            //     type: "max",
            //     params: [9999999999, "phone number cannot be more than 10 characters"]
            // },
        ]
    },
    {
        name: "batchIdentifier",
        type: "text",
        label: "Batch identifier",
        placeholder: "",
        showTooltip: false,
        tooltipText: "",
        readOnly: true,
        required: true,
        validation: null,
    },

    // {
    //     name: "email",
    //     type: "text",
    //     label: "email",
    //     placeholder: "email",
    //     showTooltip: true,
    //     tooltipText: "please enter email",
    //     readOnly: false,
    //     validationType: "string",
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["Email is required."]
    //         },
    //         {
    //             type: "email",
    //             params: ["Please enter valid email."]
    //         },

    //     ]
    // },

    // {
    //     name: "test",
    //     type: "select",
    //     label: "test",
    //     placeholder: "Select test",
    //     showTooltip: false,
    //     tooltipText: "",
    //     readOnly: false,
    //     optionsFromApi: {
    //         specificBaseUrl: true,
    //         url: "https://jsonplaceholder.typicode.com/posts",
    //         isUpdateData: true,
    //         updateData: (optionList) => {
    //             const newOptionList = optionList.map((item) => {
    //                 const newItem = { ...item, label: item.title, value: item.id }
    //                 return newItem
    //             })
    //             return newOptionList
    //         }

    //     },
    //     options: [

    //     ],
    //     validationType: "string",
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["This field is required"]
    //         },
    //     ]
    // },
]