"use client";

import {User} from "next-auth";
import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";
import {HiCog, HiUser} from "react-icons/hi2";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import Link from "next/link";
import {signOut} from "next-auth/react";

type Props = {
    user: User;
}

export function UserActions({user}: Props): React.ReactElement {
    return (
        <Dropdown inline label={`Welcome ${user.name}`} className="cursor-pointer">
            <DropdownItem icon={HiUser}>
                My Auctions
            </DropdownItem>

            <DropdownItem icon={AiFillTrophy}>
                Auctions won
            </DropdownItem>

            <DropdownItem icon={AiFillCar}>
                Sell my car
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
