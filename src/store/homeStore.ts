interface HomeState {
  items: any[];
  selectedItem: any | null;
}

const initialState: HomeState = {
  items: [],
  selectedItem: null,
};

// Add your state management logic here (e.g., Zustand, Redux, etc.)
export const homeStore = initialState;
