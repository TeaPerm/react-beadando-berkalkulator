import { create } from "zustand";

export const useFormState = create((set, get) => {
  const initialMembers = JSON.parse(localStorage.getItem("members")) || [
    {
      id: 0,
      name: "",
      brutto: 578_300,
      under25: {
        checked: false,
      },
      freshMarriage: {
        date: "",
        checked: false,
      },
      personalTax: {
        checked: false,
      },
      familyTax: {
        checked: false,
        supported: 0,
        supportedDiscounted: 0,
      },
    },
  ];

  const persistMembers = (members) => {
    localStorage.setItem("members", JSON.stringify(members));
  };

  return {
    selectedId: 0,
    members: initialMembers,
    addMember: () =>
      set((state) => {
        const newMembers = [
          ...state.members,
          {
            id: getMaxId(state.members) + 1,
            name: "",
            brutto: 578_300,
            under25: {
              checked: false,
            },
            freshMarriage: {
              date: "",
              checked: false,
            },
            personalTax: {
              checked: false,
            },
            familyTax: {
              checked: false,
              supported: 0,
              supportedDiscounted: 0,
            },
          },
        ];
        persistMembers(newMembers);
        return { members: newMembers };
      }),
    changeName: (id, newName) =>
      set((state) => {
        const newMembers = state.members.map((member) =>
          member.id === id ? { ...member, name: newName } : member
        );
        persistMembers(newMembers);
        return { members: newMembers };
      }),
    changeSelectedMember: (id) => set(() => ({ selectedId: id })),
    changeBrutto: (id, newBrutto) =>
      set((state) => {
        const newMembers = state.members.map((member) =>
          member.id === id ? { ...member, brutto: newBrutto } : member
        );
        persistMembers(newMembers);
        return { members: newMembers };
      }),
    changeOption: (id, switchId, newVal) =>
      set((state) => {
        const newMembers = state.members.map((member) =>
          member.id === id ? { ...member, [switchId]: newVal } : member
        );
        persistMembers(newMembers);
        return { members: newMembers };
      }),
    deleteMember: (id) =>
      set((state) => {
        const newMembers = state.members.filter((member) => member.id !== id);
        persistMembers(newMembers);
        return { members: newMembers };
      }),
  };
});

export function getMaxId(members) {
  if (members.length === 0) {
    return null;
  }
  const maxId = members.reduce((max, member) => {
    return Math.max(max, member.id || 0);
  }, -Infinity);
  return maxId;
}
