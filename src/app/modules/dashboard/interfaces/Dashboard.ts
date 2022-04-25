export interface DataItem {
    id: string,
    month: string;
    camp: string,
    country: string,
    school: string,
    lessons: number
}

export interface DropdownsData {
    countries: string[],
    camps: string[],
    schools: string[],
}

export interface SelectedDropdownsData {
    country: string,
    camp: string,
    school: string,
}

export interface ChartDataItem {
    label: string,
    data: { x: string, y: number }[],
    info: DataItem[],
    totalLessons:number
}