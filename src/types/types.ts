export interface Task {
    text:string,
    done:boolean,
    id: string,
    important: string,
    creatingDate: Date,
    deadline: Date
}
export interface Filter1 {
    search: string,
    done: 'all' | 'completed' | 'uncompleted',
    important: string,
    creatingDateFrom: Date,
    deadlineFrom: Date,
    creatingDateTo: Date,
    deadlineTo: Date
}