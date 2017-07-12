//kendo.timezone.convert(targetDate, "Etc/GMT+2", "Etc/GMT-6");
app.controller('schedulerController', ['$scope', function ($scope) {
    function scheduler_save(e) {
        console.log(e);
    }

    $scope.schedulerOptions = {
        date: new Date("2017/7/13"),
        startTime: new Date("2017/7/13 00:00:00 GMT+0200"),
        height: 600,
        views: [
            "day",
            {
                type: "month",
                selected: true
            },
            "week",
            "month",
        ],
        //save: scheduler_save,
        timezone: "Europe/Kiev",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    // url: "https://demos.telerik.com/kendo-ui/service/tasks",
                    // dataType: "jsonp"

                    url: "http://localhost:3000/api/tasks/",
                    dataType: "json"
                },
                update: {
                    // url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                    // dataType: "jsonp"

                    url: "http://localhost:3000/api/taskUpdate/",
                    dataType: "jsonp",
                    type: "PUT"
                },
                create: {
                    // url: "http://demos.kendoui.com/service/tasks/create",
                    // dataType: "jsonp"

                    url: "http://localhost:3000/api/taskCreate/",
                    dataType: "jsonp",
                    type: "POST"
                },
                destroy: {
                    // url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    // dataType: "jsonp"

                    url: "http://localhost:3000/api/taskDelete/",
                    dataType: "jsonp",
                    type: "DELETE"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return {
                            models: kendo.stringify(options.models)
                        };
                    }
                }
            },
            schema: {
                timezone: "Europe/Kiev",
                model: {
                    id: "taskId",
                    fields: {
                        taskId: {
                            from: "TaskID",
                            type: "number"
                        },
                        title: {
                            from: "Title",
                            defaultValue: "No title",
                            validation: {
                                required: true
                            }
                        },
                        start: {
                            type: "date",
                            from: "Start"
                        },
                        end: {
                            type: "date",
                            from: "End"
                        },
                        startTimezone: {
                            from: "StartTimezone",
                            //defaultValue: 'Europe/London'
                        },
                        endTimezone: {
                            from: "EndTimezone",
                            //defaultValue: 'Europe/London'
                        },
                        description: {
                            from: "Description"
                        },
                        recurrenceId: {
                            from: "RecurrenceID"
                        },
                        recurrenceRule: {
                            from: "RecurrenceRule"
                        },
                        recurrenceException: {
                            from: "RecurrenceException"
                        },
                        ownerId: {
                            from: "OwnerID",
                            defaultValue: 1
                        },
                        isAllDay: {
                            type: "boolean",
                            from: "IsAllDay"
                        }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [{
                    field: "ownerId",
                    operator: "eq",
                    value: 1
                },
                {
                    field: "ownerId",
                    operator: "eq",
                    value: 2
                }
                ]
            }
        },
        resources: [{
            field: "ownerId",
            title: "Owner",
            dataSource: [{
                text: "Alex",
                value: 1,
                color: "#f8a398"
            },
            {
                text: "Bob",
                value: 2,
                color: "#51a0ed"
            },
            {
                text: "Charlie",
                value: 3,
                color: "#56ca85"
            }
            ]
        }]
    };
}]);