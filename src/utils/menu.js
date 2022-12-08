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
                name: "User",
                link: "/main/user",
                type: "link",
                icon:mdiEyeOutline,
                child: [],
                visible:[
                    "DEV",
                    "ADMIN"
                ]
            },
            {
                name: "Topic",
                link: "/main/topic",
                type: "link",
                icon:mdiEyeOutline,
                child: [],
                visible:[
                    "DEV",
                    "ADMIN"
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