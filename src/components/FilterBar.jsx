import { GoSearch } from "react-icons/go";
import { useState } from "react";

function FilterBar({ allPlanners, setFilteredPlanners }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);

    const filteredArr = (allPlanners || []).filter((plan) =>
      (plan.planTitle || "").toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPlanners(filteredArr);
  };

  return (
    <div className="max-w-md border bg-neutral-200 hover:border-fuchsia-900 rounded-3xl">
      <form
        className="flex justify-around items-center p-1 rounded-3xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-10"></div>
        <GoSearch />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

export default FilterBar;