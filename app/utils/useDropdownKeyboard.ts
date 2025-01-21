// HOW TO USE PROPERLY

/* --- 1. Setup example ---------
useDropdownKeyboard(
  items, // Array of objects or function, selected item will be returned
  0, // Number of already selected value
  'options-class-name', // Custom options class name, default is 'dropdown-option'
  selectedItem => function(selectedItem.code), // On return
)>
- Can avoid 'options-class-name' setting options class name to 'dropdown-option'
--------------------------------- */
/* --- 2. ElDropdown template ---
- Onto ElDropdown activating component set:
@keyup.enter="toggleDropdown(true)"
@keyup.space="toggleDropdown(true)"

Example
<ElDropdown>
  <ElButton
    @keyup.enter="toggleDropdown(true)"
    @keyup.space="toggleDropdown(true)"
  >
</ElDropdown>
--------------------------------- */
/* --- 3. Options template ---
- Set to all options: tabindex="0"

Example
<ElDropdownItem
  v-for="item in items"
  class="dropdown-option"
  tabindex="0"
>
  {{ item }}
</ElDropdownItem>
--------------------------------- */

/* SMART TO USE

  1. Dropdown ref to close dropdown on select

    const dropdownRef = ref<HTMLElement | null>(null)

    WITH

    <ElDropdown ref="dropdownRef">...</ElDropdown>

    useDropdownKeyboard(
      items,
      0,
      'options-class-name',
      selectedItem => {
        function(selectedItem.code)
        dropdownRef.value.handleClose() // HERE
      },
    )>

  2. Use handleDropdownVisibleChange with dropdown emit visible-change
     to enable event listener (when there is more than 1 dropdowns)

    const { handleDropdownVisibleChange } = useDropdownKeyboard()

    WITH

    <ElDropdown { toggleDropdown, handleDropdownVisibleChange } = useDropdownKeyboard(lDropdown @visible-change="handleDropdownVisibleChange">...</ElDropdown>
*/
import { onBeforeMount } from 'vue'

export function useDropdownKeyboard<T>(
  items: T[],
  selected: Ref<number> | number = 0,
  dropdownOptionClass: string = '.dropdown-option',
  onSelect: (item: T) => void,
) {
  const isDropdownOpen = ref(false)
  const focusedIndex = ref(-1)

  function startKeyListener() {
    document.addEventListener('keydown', handleKeyDown)
  }

  function endKeyListener() {
    document.removeEventListener('keydown', handleKeyDown)
  }

  onBeforeMount(() => endKeyListener())

  function toggleDropdown(open: boolean) {
    isDropdownOpen.value = open
    if (!open) {
      focusedIndex.value = -1
      endKeyListener()
    }
    else {
      startKeyListener()
      setTimeout(() => {
        focusedIndex.value = isRef(selected) ? selected.value : selected
        focusOption(focusedIndex.value)
      }, 250)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!isDropdownOpen.value) { return }

    const itemCount = items.length
    if (event.key === 'Escape') { toggleDropdown(false) }
    else if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusedIndex.value = (focusedIndex.value + 1) % itemCount
      focusOption(focusedIndex.value)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusedIndex.value = (focusedIndex.value - 1 + itemCount) % itemCount
      focusOption(focusedIndex.value)
    }
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (focusedIndex.value >= 0) {
        onSelect(items[focusedIndex.value]!)
        toggleDropdown(false)
      }
    }
  }

  function focusOption(index: number) {
    const optionElements = document.querySelectorAll(`.${dropdownOptionClass}` || '.dropdown-option')
    if (optionElements[index]) {
      (optionElements[index] as HTMLElement).focus()
    }
  }

  function handleDropdownVisibleChange(state: boolean) {
    isDropdownOpen.value = state
    if (!state) {
      endKeyListener()
      focusedIndex.value = -1
    }
  }

  return {
    isDropdownOpen,
    focusedIndex,
    toggleDropdown,
    handleKeyDown,
    startKeyListener,
    endKeyListener,
    handleDropdownVisibleChange,
  }
}
