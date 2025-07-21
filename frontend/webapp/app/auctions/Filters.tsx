import {Button, ButtonGroup} from "flowbite-react";
import {useParamStore} from "@/hooks/useParamStore";
import {AiOutlineClockCircle, AiOutlineSortAscending} from "react-icons/ai";
import {BsFillStopCircleFill, BsStopwatchFill} from "react-icons/bs";
import {GiFinishLine, GiFlame} from "react-icons/gi";

const PAGE_SIZE_BUTTONS = [4, 8, 12, 24, 32, 48, 56];

const ORDER_BUTTONS = [
    {label: "Alphabetical", icon: AiOutlineSortAscending, value: "make"},
    {label: "End date", icon: AiOutlineClockCircle, value: "endingSoon"},
    {label: "Recently added", icon: BsFillStopCircleFill, value: "new"},
]

const FILTER_BUTTONS = [
    {label: "Live auctions", icon: GiFlame, value: "live"},
    {label: "Ending < 6 hours", icon: GiFinishLine, value: "endingSoon"},
    {label: "Complete", icon: BsStopwatchFill, value: "finished"},
]

export default function Filters() {

    // get hold of our store
    const pageSize = useParamStore(state => state.pageSize);
    const setParams = useParamStore(state => state.setParams);
    const orderBy = useParamStore(state => state.orderBy);
    const filterBy = useParamStore(state => state.filterBy);

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Filter by</span>
                <ButtonGroup outline>
                    {FILTER_BUTTONS.map(({label, icon: FilterIcon, value}) => (
                        <Button
                            key={value}
                            onClick={() => setParams({filterBy: value})}
                            color={`${filterBy == value ? 'red' : 'gray'}`}
                            className="focus:right-0"
                        >
                            <FilterIcon className="mr-3 h-4 w-4"/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>
                <ButtonGroup outline>
                    {ORDER_BUTTONS.map(({label, icon: OrderIcon, value}) => (
                        <Button
                            key={value}
                            onClick={() => setParams({orderBy: value})}
                            color={`${orderBy == value ? 'red' : 'gray'}`}
                            className="focus:right-0"
                        >
                            <OrderIcon className="mr-3 h-4 w-4"/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
                <ButtonGroup outline>
                    {PAGE_SIZE_BUTTONS.map((value: number, index: number) => (
                        <Button
                            key={index}
                            onClick={() => setParams({pageSize: value})}
                            color={`${pageSize == value ? 'red' : 'gray'}`}
                            className="focus:right-0"
                        >
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}
