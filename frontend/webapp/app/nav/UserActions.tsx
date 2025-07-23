"use client";

import {User} from "next-auth";
import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";
import {HiCog, HiUser} from "react-icons/hi2";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {useParamStore} from "@/hooks/useParamStore";
import {usePathname, useRouter} from "next/navigation";

type Props = {
    user: User;
}

export function UserActions({user}: Props): React.ReactElement {

    const router = useRouter();
    const pathname = usePathname();

    const setParams = useParamStore(state => state.setParams);

    function setWinner() {
        setParams({
            winner: user.username,
            seller: undefined
        });

        if (pathname !== "/") {
            router.push("/");
        }
    }

    function setSeller() {
        setParams({
            winner: undefined,
            seller: user.username,
        });

        if (pathname !== "/") {
            router.push("/");
        }
    }

    return (
        <Dropdown inline label={`Welcome ${user.name}`} className="cursor-pointer">
            <DropdownItem icon={HiUser} onClick={setSeller}>
                My Auctions
            </DropdownItem>

            <DropdownItem icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </DropdownItem>

            <DropdownItem icon={AiFillCar}>
                <Link href={'/auctions/create'}>
                    Sell my car
                </Link>
            </DropdownItem>

            <DropdownItem icon={HiCog}>
                <Link href="/session">Session</Link>
            </DropdownItem>

            <DropdownDivider/>

            <DropdownItem icon={AiOutlineLogout} onClick={() => {
                signOut({redirectTo: "/"});
            }}>
                Logout
            </DropdownItem>

        </Dropdown>
    );
}
