import React, { useState } from 'react';
import { Dropdown } from '../../ui/dropdown/Dropdown';
import { DropdownItem } from '../../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';
const CardsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(event) {
    event.stopPropagation();
    event.preventDefault();
    // setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        className="dropdown-toggle hover:cursor-not-allowed" // Adds a class to change the cursor on hover
        onClick={(event) => toggleDropdown(event)}
        disabled={!isOpen} // Disables the button when the dropdown is not open
        aria-disabled={!isOpen} // Adds an accessibility property
      >
        <MoreDotIcon className="text-gray-400 hover:text-gray-700 size-6" />
      </button>
      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
        <DropdownItem
          onItemClick={closeDropdown}
          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer" // Adds hover cursor change
        >
          View More
        </DropdownItem>
        <DropdownItem
          onItemClick={closeDropdown}
          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer" // Adds hover cursor change
        >
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default CardsDropdown;
