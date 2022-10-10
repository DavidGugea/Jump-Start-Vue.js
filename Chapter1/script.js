Vue.createApp({
    data() {
        return {
            heading: "Staff Directory",
            sortBy: "firstName",
            employees:[
                {
                    "firstName": "amelia",
                    "lastName": "austin",
                    "photoUrl":
                    "https://randomuser.me/api/portraits/thumb/women/9.jpg",
                    "email": "amelia.austin@example.com",
                    "phone": "(651)-507-3705",
                    "department": "Engineering"
                },
                {
                    "firstName": "bobbie",
                    "lastName": "murphy",
                    "photoUrl":
                    "https://randomuser.me/api/portraits/thumb/women/79.jpg",
                    "email": "bobbie.murphy@example.com",
                    "phone": "(925)-667-7604",
                    "department": "Management"
                }
            ]
        }
    },
    computed: {
        sortedEmployees() {
            return this.employees.sort((a, b) => a[this.sortBy].localCompare(b[this.sortBy]));
        }
    }
}).mount("#main");