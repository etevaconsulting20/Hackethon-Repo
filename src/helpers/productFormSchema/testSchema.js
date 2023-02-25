export const formFieldSchema = [
    {
        name: "email",
        type: "text",
        label: "email",
        placeholder: "email",
        showTooltip: true,
        tooltipText: "please enter email",
        readOnly: false,
        validationType: "string",
        validations: [
            {
                type: "required",
                params: ["Email is required."]
            },
            {
                type: "email",
                params: ["Please enter valid email."]
            },

        ]
    },
    {
        name: "test",
        type: "select",
        label: "test",
        placeholder: "Select test",
        showTooltip: false,
        tooltipText: "",
        readOnly: false,
        required: true,
        optionsFromApi: {
            specificBaseUrl: true,
            url: "https://jsonplaceholder.typicode.com/posts",
            isUpdateData: true,
            updateData: (optionList) => {
                const newOptionList = optionList.map((item) => {
                    const newItem = { ...item, label: item.title, value: item.id }
                    return newItem
                })
                return newOptionList
            }

        },
        options: [

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
        name: "boodGroup",
        type: "select",
        label: "",
        showTooltip: true,
        tooltipText: "select Blood Group",
        readOnly: false,
        options: [
            { label: "A+", value: "a+" },
            { label: "A-", value: "a-" },
            { label: "B+", value: "b+" },
            { label: "B-", value: "b-" },
            { label: "AB+", value: "ab+" },
            { label: "AB-", value: "ab-" },
            { label: "O+", value: "o+" },
            { label: "O-", value: "o-" },
        ],
        validationType: "string",
        validations: [],
    },
    {
        name: "gender",
        type: "redio",
        label: "",
        showTooltip: true,
        tooltipText: "select gender",
        readOnly: false,
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
        ],
        validationType: "string",
        validations: [],
    },
    {
        name: "hobby",
        type: "checkbox",
        label: "Hobby",
        showTooltip: true,
        tooltipText: "select hobby",
        readOnly: false,
        validationType: "string",
        options: [
            { label: "Reading", value: "reading" },
            { label: "Listening", value: "listening" },
            { label: "Playing", value: "playing" },
            { label: "Singing", value: "singing" },
        ],
        validations: [],
    },
]

