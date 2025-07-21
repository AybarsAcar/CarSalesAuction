import {Button, ButtonGroup} from "flowbite-react";
import {useParamStore} from "@/hooks/useParamStore";

const PAGE_SIZE_BUTTONS = [4, 8, 12, 24, 32, 48, 56];

export default function Filters() {

    // get hold of our store
    const pageSize = useParamStore(state => state.pageSize);
    const setParams = useParamStore(state => state.setParams);

    return (
        <div className="flex justify-between items-center mb-4">
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
