import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
function Header({ placeholder }) {
  const [serachInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGeust, setNoOFGeust] = useState(1);
  const handelSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const serach = () => {
    router.push({
      pathname: "/search",
      query: {
        location: serachInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGeust,
      },
    });
  };

  return (
    <header className=" sticky bg-white shadow-md p-5 top-0 z-50 grid grid-cols-3 md:px-10">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle -- Serach*/}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={serachInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || "Start your search"}
          className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* right */}
      <div className="flex  items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host </p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex border-2 p-2 rounded-full space-x-2 items-center">
          <MenuIcon className="h-6 " />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {serachInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handelSelect}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGeust}
              onChange={(e) => setNoOFGeust(e.target.value)}
              min={1}
              type="number"
              className="w-12 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={serach} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
