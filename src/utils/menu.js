import {
    mdiHomeOutline,
    mdiAlphaTBoxOutline,
    mdiEyeOutline,
    mdiCreditCardOutline,
    mdiTable,
    mdiFileOutline,
    mdiFormSelect,
    mdiAccountCogOutline,
  } from '@mdi/js'

const menu = [
    {
        name: "Dashboard",
        link: "/main/dashboard",
        type: "link",
        icon:mdiHomeOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "Feature",
        link: "",
        type: "divider",
        icon:mdiAlphaTBoxOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "My Podcast",
        link: "/main/podcast",
        type: "link",
        icon:mdiHomeOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "Master Data",
        link: "/main/master_data",
        type: "sub",
        icon:mdiTable,
        visible:[
            "ADMIN",
            "DEV"
        ],
        child: [
            {
                name: "Episode",
                link: "/main/hospital",
                type: "link",
                icon:mdiFileOutline,
                child: [],
                visible:[
                    "ADMIN",
                    "DEV"
                ]
            }
        ]
    },
    {
        name: "System",
        link: "",
        type: "divider",
        icon:mdiAlphaTBoxOutline,
        child: [],
        visible:[
            "PUBLIC",
        ]
    },
    {
        name: "User",
        link: "/main/user",
        type: "link",
        icon:mdiEyeOutline,
        child: [],
        visible:[
            "DEV",
        ]
    },
    {
        name: "Akun",
        link: "/main/account-setting",
        type: "link",
        icon:mdiEyeOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
]

export{ menu}