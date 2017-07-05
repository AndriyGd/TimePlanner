app.controller('schedulerController', ['$scope', function($scope) {
    $scope.schedulerOptions = {
        date: new Date("2017/7/13"),
        startTime: new Date("2017/7/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            {
                type: "workWeek",
                selected: true
            },
            "week",
            "month",
        ],
        messages: {
            allDay: "daily",
            ariaEventLabel: "Selected event is {0}. It starts on {1:d} {2:t}",
            cancel: "Undo"
        },
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "http://localhost:3000/api/tasks/",
                    dataType: "json"
                },
                update: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    // url: "http://demos.kendoui.com/service/tasks/create",
                    // dataType: "jsonp"
                    url: "http://localhost:3000/api/tasks/",
                    dataType: "jsonp",
                    type: "POST"
                },
                destroy: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {
                            models: kendo.stringify(options.models)
                        };
                    }
                }
            },
            schema: {
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
                            from: "StartTimezone"
                        },
                        endTimezone: {
                            from: "EndTimezone"
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