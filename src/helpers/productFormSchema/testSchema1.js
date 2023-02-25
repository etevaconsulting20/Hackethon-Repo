export default [

    {
        name: "employeeId",
        label: "Employee Id",
        placeholder: "Enter Employee Id",
        tooltipText: "Employee Id",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "number",
        validationType: "string",
        validations: [
            {
                type: "matches",
                params: [
                    "^[0-9]{0}$|^[0-9]{8}$|^[0-9]{12}$|^[0-9]{14}$",
                    "gtin should be 8 or 12 or 14 character & should be number.",
                ],
            },
        ],
    },
    {
        name: "gtin",
        label: "_GTIN",
        placeholder: "",
        tooltipText: "GTIN",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: true,
        type: "text",
        validationType: "string",
        validations: [
            {
                type: "matches",
                params: [
                    "^[0-9]{0}$|^[0-9]{8}$|^[0-9]{12}$|^[0-9]{14}$",
                    "gtin should be 8 or 12 or 14 character & should be number.",
                ],
            },
        ],
    },
    {
        name: "businessIdentifiers",
        label: "_Company",
        placeholder: "",
        tooltipText: "_Business Id",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: true,
        type: "businessIdentifiers",
        options: [],
        validationType: "",
        validations: [],
    },
    {
        name: "test",
        label: "Test 1",
        placeholder: "Test placeholder",
        tooltipText: "test tooltip",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: true,
        type: "text",
        options: [],
        validationType: "",
        validations: [],
    },
    // {
    //     name: "brandName",
    //     label: "_Brand Name",
    //     placeholder: "",
    //     tooltipText: "Brand Name",
    //     parentTab: "General",
    //     tabName: "Identifier_tab",
    //     readOnly: false,
    //     type: "text",
    //     validationType: "string",
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["This field is required"],
    //         },
    //     ],
    // },
    {
        name: "createdDate",
        label: "_Created Date",
        placeholder: "",
        tooltipText: "Created Date",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: true,
        type: "text",
    },
    {
        name: "modifiedDate",
        label: "_Modified Date",
        placeholder: "",
        tooltipText: "Modified Date",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: true,
        type: "text",
    },
    {
        name: "profileActive",
        label: "Profile Active",
        placeholder: "",
        tooltipText: "Profile Active",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "switch",
    },
    {
        name: "productName",
        label: "_Product Name",
        placeholder: "",
        tooltipText: "Product Name",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "text",
    },
    {
        name: "regulatedProductName",
        label: "_Regulated Product Name",
        placeholder: "",
        tooltipText: "Regulated Product Name",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "text",
    },
    {
        name: "descriptionShort",
        label: "_Description Short",
        placeholder: "",
        tooltipText: "Description Short",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "text",
        aiEnable: true,
    },
    {
        name: "description",
        label: "_Description",
        placeholder: "",
        tooltipText: "Description",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "textarea",
        aiEnable: true,
    },
    {
        name: "externalSources",
        label: "External sources",
        placeholder: "",
        tooltipText: "External sources",
        parentTab: "General",
        tabName: "Identifier_tab",
        readOnly: false,
        type: "externalSources",
        aiEnable: false,
    },
    {
        parentTab: "General",
        tabName: "Manufacturer_tab",
        readOnly: false,
        type: "manufacturerDetails",
        componentSchema: [
            {
                name: "name",
                label: "_Manufacturer Name",
                placeholder: "",
                tooltipText: "Manufacturer Name",
                parentTab: "General",
                tabName: "Manufacturer_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "businessId",
                label: "_Business Id",
                placeholder: "",
                tooltipText: "Business Id",
                parentTab: "General",
                tabName: "Manufacturer_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "contact",
                label: "_Contact",
                placeholder: "",
                tooltipText: "Contact",
                parentTab: "General",
                tabName: "Manufacturer_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "address",
                label: "_Address",
                placeholder: "",
                tooltipText: "Address",
                parentTab: "General",
                tabName: "Manufacturer_tab",
                readOnly: false,
                type: "text",
            },
        ],
    },
    {
        name: 'private.feedback.emails',
        label: '_Feedback Recipient Emails',
        placeholder: '',
        tooltipText: 'Feedback Recipient Emails',
        parentTab: 'General',
        tabName: 'Manufacturer_tab',
        readOnly: false,
        type: "emailMultiAdd",
    },
    {
        name: "ecommerce",
        parentTab: "General",
        tabName: "Manufacturer_tab",
        type: "ecommerce",
    },
    {
        name: "restrictions",
        label: "_Restrictions",
        placeholder: "",
        tooltipText: "_Restrictions",
        parentTab: "General",
        tabName: "Category_tab",
        readOnly: false,
        type: "restrictions",
    },
    {
        category: [
            {
                name: "segmentCode.id",
                label: "_Segment",
                placeholder: "",
                tooltipText: "Select Segment",
                parentTab: "General",
                tabName: "Category_tab",
                readOnly: false,
                type: "select",
            },
            {
                name: "familyCode.id",
                label: "_Family",
                placeholder: "",
                tooltipText: "_Family",
                dependsOnName: "segmentCode.id",
                parentTab: "General",
                tabName: "Category_tab",
                readOnly: false,
                type: "select",
            },
            {
                name: "classCode.id",
                label: "_Class",
                placeholder: "",
                tooltipText: "_Class",
                dependsOnName: "familyCode.id",
                parentTab: "General",
                tabName: "Category_tab",
                readOnly: false,
                type: "select",
            },
            {
                name: "categoryCode.id",
                label: "_Category",
                placeholder: "",
                tooltipText: "_Category",
                dependsOnName: "classCode.id",
                parentTab: "General",
                tabName: "Category_tab",
                readOnly: false,
                type: "select",
            },
        ],
    },
    {
        name: "ingredients",
        label: "_Ingredients",
        placeholder: "",
        tooltipText: "Ingredients",
        parentTab: "Contents",
        tabName: "Ingredients_tab",
        readOnly: false,
        type: "textarea",
    },
    {
        allergens: [
            {
                name: "list.contains",
                label: "_Allergens Contains",
                placeholder: "",
                tooltipText: "Allergens Contains",
                parentTab: "Contents",
                tabName: "Allergens_tab",
                readOnly: false,
                type: "multiSelectWithModal",
                modalTitle: "Select Allergens Here",
                validationType: "array",
            },
            {
                name: "list.free_from",
                label: "_Allergens Free From",
                placeholder: "",
                tooltipText: "Allergens Free From",
                parentTab: "Contents",
                tabName: "Allergens_tab",
                readOnly: false,
                type: "multiSelectWithModal",
                modalTitle: "Select Allergens Here",
                validationType: "array",
            },
            {
                name: "list.may_contain",
                label: "_Allergens May Contains",
                placeholder: "",
                tooltipText: "Allergens May Contains",
                parentTab: "Contents",
                tabName: "Allergens_tab",
                readOnly: false,
                type: "multiSelectWithModal",
                modalTitle: "Select Allergens Here",
                validationType: "array",
            },
        ],
    },
    // {
    //     allergens: {
    //         list: [
    //             {
    //                 name: 'contains',
    //                 label: '_Allergens Contains',
    //                  placeholder: '',
    //                 tooltipText: 'manufacturerName_en help text',
    //                 parentTab: 'Contents',
    //                 tabName: 'Allergens_tab',
    //                 readOnly: false,
    //                 type: 'multiSelectWithModal',
    //                 validationType: 'array',
    //             },
    //             {
    //                 name: 'free_from',
    //                 label: '_Allergens free from',
    //                     placeholder: '',
    //                 tooltipText: 'manufacturerName_en help text',
    //                 parentTab: 'Contents',
    //                 tabName: 'Allergens_tab',
    //                 readOnly: false,
    //                 type: 'multiSelectWithModal',
    //                 validationType: 'array',
    //             },
    //             {
    //                 name: 'may_contain',
    //                 label: '_Allergens may contains',
    //                  placeholder: '',
    //                 tooltipText: 'manufacturerName_en help text',
    //                 parentTab: 'Contents',
    //                 tabName: 'Allergens_tab',
    //                 readOnly: false,
    //                 type: 'multiSelectWithModal',
    //                 validationType: 'array',
    //             },
    //         ]
    //     }
    // },
    {
        additives: [
            {
                name: "contains",
                label: "_Additives Contains",
                placeholder: "",
                tooltipText: "Additives Contains",
                parentTab: "Contents",
                tabName: "Additives_tab",
                readOnly: false,
                type: "textMultiAdd",
                validationType: "array",
            },
            {
                name: "free_from",
                label: "_Additives Free From",
                placeholder: "",
                tooltipText: "Additives Free From",
                parentTab: "Contents",
                tabName: "Additives_tab",
                readOnly: false,
                type: "textMultiAdd",
                validationType: "array",
            },
            {
                name: "may_contain",
                label: "_Additives May Contains",
                placeholder: "",
                tooltipText: "Additives May Contains",
                parentTab: "Contents",
                tabName: "Additives_tab",
                readOnly: false,
                type: "textMultiAdd",
                validationType: "array",
            },
        ],
    },

    {
        multimedia: [
            {
                name: "primary[0]",
                bottomLabel: "primary Image",
                placeholder: "",
                tooltipText: "",
                tabName: "Media_tab",
                section: "Product profile Images",
                sectionTooltipText: "Product Profile Images",
                readOnly: false,
                type: "mediaImage",
            },
            {
                name: "frontal[0]",
                bottomLabel: "frontal Image",
                placeholder: "",
                tooltipText: "",
                tabName: "Media_tab",
                section: "Product profile Images",
                readOnly: false,
                type: "mediaImage",
            },
            {
                name: "backside[0]",
                bottomLabel: "backside Image",
                placeholder: "",
                tooltipText: "",
                tabName: "Media_tab",
                section: "Product profile Images",
                readOnly: false,
                type: "mediaImage",
            },
            {
                name: "square[0]",
                bottomLabel: "square Image",
                placeholder: "",
                tabName: "Media_tab",
                section: "Product profile Images",
                readOnly: false,
                tooltipText: "",
                type: "mediaImage",
            },
            {
                name: "logo[0]",
                bottomLabel: "logo Image",
                placeholder: "",
                tabName: "Media_tab",
                section: "Product profile Images",
                readOnly: false,
                tooltipText: "",
                type: "mediaImage",
            },
            {
                name: "other",
                label: "",
                placeholder: "",
                tooltipText: "",
                tabName: "Media_tab",
                section: "Other Images",
                sectionTooltipText: "Other Images",
                readOnly: false,
                type: "mediaImageOther",
            },
            {
                name: "other",
                label: "",
                placeholder: "",
                tabName: "Media_tab",
                section: "3D Models",
                sectionTooltipText: "3d Models",
                readOnly: false,
                tooltipText: "",
                type: "media3dmodel",
            },
            {
                name: "other",
                label: "",
                placeholder: "",
                tabName: "Media_tab",
                section: "Video",
                sectionTooltipText: "Videos",
                readOnly: false,
                tooltipText: "",
                type: "video",
            },
            {
                name: "pdf",
                label: "",
                placeholder: "",
                tabName: "Media_tab",
                section: "PDF file",
                readOnly: false,
                tooltipText: "",
                type: "pdf",
            },
            {
                name: "other",
                label: "",
                placeholder: "",
                tabName: "Media_tab",
                section: "Other file",
                sectionTooltipText: "Other Files",
                readOnly: false,
                tooltipText: "",
                type: "mediaOtherFile",
            },
        ],
    },
    {
        name: "videos",
        label: "",
        placeholder: "",
        tabName: "Media_tab",
        section: "Video URL",
        sectionTooltipText: "Video Urls",
        readOnly: false,
        tooltipText: "",
        type: "videoUrl",
    },

    {
        marketing: [
            {
                name: "websiteUrl",
                label: "_Website Url",
                placeholder: "",
                tabName: "Marketing_tab",
                readOnly: false,
                tooltipText: "Website Url",
                type: "text",
                validationType: "string",
                validations: [
                    {
                        type: "url",
                        params: ["Should be valid url"],
                    },
                ],
            },
            {
                name: "overlayUrl",
                label: "_Overlay Url",
                placeholder: "",
                tabName: "Marketing_tab",
                readOnly: false,
                tooltipText: "Overlay Url",
                type: "text",
                validationType: "string",
            },
            {
                name: "publicEmail",
                label: "_Public Email",
                placeholder: "",
                tooltipText: "Public Email",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "publicTelephone",
                label: "_Public Telephone",
                placeholder: "",
                tooltipText: "Public Telephone",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "text",
            },

            {
                name: "postalAddress[0]",
                subsection: "Postal Address",
                subSectionTooltipText: "Postal Address",
                tabName: "Marketing_tab",
                placeholder: "Line 1",
                readOnly: false,
                type: "text",
            },
            {
                name: "postalAddress[1]",
                subsection: "Postal Address",
                tabName: "Marketing_tab",
                placeholder: "Line 2",
                readOnly: false,
                type: "text",
            },
            {
                name: "postalAddress[2]",
                subsection: "Postal Address",
                tabName: "Marketing_tab",
                placeholder: "Line 3",
                readOnly: false,
                type: "text",
            },
            {
                name: "postalAddress[3]",
                subsection: "Postal Address",
                tabName: "Marketing_tab",
                placeholder: "Line 4",
                readOnly: false,
                type: "text",
            },

            {
                name: "marketingTexts",
                label: "_Marketing Texts",
                placeholder: "",
                tooltipText: "Marketing Text",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "textarea",
                aiEnable: true,
            },
            {
                name: "banner1",
                label: "_Top Banner",
                placeholder: "",
                tooltipText: "Top Banner",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "banner2",
                label: "_Lower Banner",
                placeholder: "",
                tabName: "Marketing_tab",
                readOnly: false,
                tooltipText: "Lower Banner",
                type: "text",
            },
            {
                name: "usageInstructions",
                label: "_Usage Instructions",
                placeholder: "",
                tooltipText: "Usage Instructions",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "textarea",
            },

            {
                name: "buyNowUrls",
                label: "_Buy Now Urls",
                placeholder: "",
                tooltipText: "Buy Now Urls",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "urlMultiAdd",
            },
            {
                name: "socialMediaUrls",
                label: "_Social Media Urls",
                placeholder: "",
                tooltipText: "Social Media Urls",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "urlMultiAdd",
                options: [
                    { value: "Facebook", label: "Facebook" },
                    { value: "Instagram", label: "Instagram" },
                    { value: "Twitter", label: "Twitter" },
                ],
            },
            {
                name: "externalLinks",
                label: "_External Links",
                tooltipText: "External Links",
                tabName: "Marketing_tab",
                readOnly: false,
                type: "urlMultiAdd",
            },
        ],
    },

    {
        name: "certifications",
        label: "_Certifications",
        tooltipText: "Certifications",
        tabName: "Marketing_tab",
        readOnly: false,
        type: "multiSelectWithModal",
        options: [
            { label: "UTZ", value: "utz" },
            { label: "Rainforest Alliance", value: "rainforestalliance" },
        ],
    },

    {
        carbonFootprint: [
            {
                name: "total",
                label: "_Carbon footprint total",
                placeholder: "",
                tooltipText: "Carbon footprint total",
                tabName: "Marketing_tab",
                section: "Carbon footprint",
                sectionTooltipText: "Carbon Footprint Data",
                readOnly: false,
                type: "text",
                validation: "",
            },
            {
                name: "dateOfCalculation",
                label: "_Carbon footprint date of calculation",
                placeholder: "",
                tooltipText: "Carbon footprint date of calculation",
                tabName: "Marketing_tab",
                section: "Carbon footprint",
                readOnly: false,
                type: "text",
                validation: "",
            },
            {
                name: "source",
                label: "_Carbon footprint source",
                placeholder: "",
                tooltipText: "Carbon footprint source",
                tabName: "Marketing_tab",
                section: "Carbon footprint",
                readOnly: false,
                type: "text",
                validation: "",
            },
            {
                name: "externalReference",
                label: "_Carbon footprint external reference",
                placeholder: "",
                tooltipText: "Carbon footprint external reference",
                tabName: "Marketing_tab",
                section: "Carbon footprint",
                readOnly: false,
                type: "text",
                validation: "",
            },
        ],
    },

    {
        "marketing.custom": [
            {
                name: "bgColor",
                label: "_Background Color",
                placeholder: "",
                tooltipText: "Background Color",
                tabName: "Marketing_tab",
                section: "Custom header",
                sectionTooltipText: "Custom Header",
                readOnly: false,
                type: "color",
            },
            {
                name: "headerText",
                label: "_Header Text",
                placeholder: "",
                tooltipText: "Header Text",
                tabName: "Marketing_tab",
                section: "Custom header",
                readOnly: false,
                type: "text",
            },
        ],
    },

    {
        name: "emailConsent",
        label: "_Email consent",
        placeholder: "",
        tooltipText: "Marketing email subscriptions",
        tabName: "Marketing_tab",
        readOnly: false,
        type: "emailConsent",
    },

    {
        directCommerce: [
            {
                name: "status",
                label: "_Status",
                placeholder: "",
                tooltipText: "Status",
                tabName: "Sales_tab",
                type: "select",
                showTooltip: true,
                readOnly: false,
                options: [
                    {
                        value: "sell",
                        label: "Sell",
                    },
                    {
                        value: "presale",
                        label: "Presale",
                    },
                    {
                        value: "nostock",
                        label: "Nostock",
                    },
                    {
                        value: "eol",
                        label: "Eol",
                    },
                    {
                        value: "na",
                        label: "Na",
                    },
                    {
                        value: "disabled",
                        label: "Disabled",
                    },
                ],
                validationType: "string",
                validations: [],
            },
            {
                name: "price",
                label: "_Price",
                placeholder: "",
                tooltipText: "Price",
                tabName: "Sales_tab",
                type: "number",
                placeholder: "",
                showTooltip: true,
                readOnly: false,
                validationType: "string",
                validations: [],
            },
            {
                name: "tax",
                label: "_Tax",
                placeholder: "",
                tooltipText: "Tax",
                tabName: "Sales_tab",
                type: "text",
                showTooltip: true,
                readOnly: false,
                validationType: "string",
                validations: [],
            },
            {
                name: "shipping",
                label: "_Shipping",
                placeholder: "",
                tooltipText: "Shipping",
                tabName: "Sales_tab",
                type: "text",
                showTooltip: true,
                readOnly: false,
                validationType: "string",
                validations: [],
            },
            {
                name: "deliveryType",
                label: "_Delivery Type",
                placeholder: "",
                tooltipText: "Delivery Type",
                tabName: "Sales_tab",
                type: "select",
                showTooltip: true,
                readOnly: false,
                options: [
                    {
                        value: "postal",
                        label: "Postal",
                    },
                    {
                        value: "digital",
                        label: "Digital",
                    },
                    {
                        value: "direct",
                        label: "Direct",
                    },
                ],
                validationType: "string",
                validations: [],
            },
        ],
    },

    {
        nutritional: [
            {
                name: "claim",
                label: "_Claims",
                placeholder: "",
                tooltipText: "Claims",
                tabName: "Nutritional_tab",
                readOnly: false,
                type: "multiSelectWithModal",
            },
            {
                name: "perQuantity",
                label: "_Per Quantity",
                placeholder: "",
                tooltipText: "Per Quantity",
                tabName: "Nutritional_tab",
                readOnly: false,
                type: "text",
            },
            {
                name: "calculatedFor",
                label: "_Calculated for",
                placeholder: "",
                tooltipText: "Calculated for",
                tabName: "Nutritional_tab",
                readOnly: false,
                type: "select",
                options: [
                    { label: "", value: "" },
                    { label: "PREPARED", value: "PREPARED" },
                    { label: "UNPREPARED", value: "UNPREPARED" },
                ],
            },

            {
                name: "details",
                placeholder: "",
                tooltipText: "Details",
                tabName: "Nutritional_tab",
                readOnly: false,
                type: "nutritionalDetails",
            },
        ],
    },

    {
        name: "UPIDS_Product",
        label: "_UPIDS Product",
        placeholder: "",
        tooltipText: "manufacturerName_en help text",
        tabName: "UPIDS Product_tab",
        readOnly: false,
        type: "upidsProduct",
    },

    {
        name: "feedback",
        label: "_Feedbacks",
        placeholder: "",
        tooltipText: "manufacturerName_en help text",
        tabName: "Feedbacks_tab",
        readOnly: false,
        type: "feedback",
    },

    {
        name: "Versioning",
        label: "_Versioning",
        placeholder: "",
        tooltipText: "manufacturerName_en help text",
        tabName: "Versioning_tab",
        readOnly: false,
        type: "versioning",
    },
];
