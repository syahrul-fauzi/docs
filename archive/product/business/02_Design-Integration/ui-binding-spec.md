# 🧩 UI Binding Specification

**Lokasi:** `docs/Business/02_Design-Integration/ui-binding-spec.md`

## 1. Tujuan

Menstandarkan kontrak antara komponen UI (AG-UI) dan domain business store.

## 2. Format Binding

| Jenis           | Keterangan                                     |
| --------------- | ---------------------------------------------- |
| `StateBinding`  | Menyediakan data reaktif dari business store   |
| `ActionBinding` | Menyediakan fungsi untuk mengeksekusi use-case |
| `EventBinding`  | Mengirim event observasi ke agent              |

## 3. Interface

```ts
interface BusinessBinding<TState, TAction> {
  state: TState;
  actions: TAction;
  subscribe?: (listener: Listener) => Unsubscribe;
}
```

## 4. Contoh Implementasi

```ts
export const useBusinessKnowledge = (): BusinessBinding<
  KnowledgeState,
  KnowledgeActions
> => {
  const state = useStore(knowledgeStore);
  const actions = useKnowledgeActions();
  return { state, actions };
};
```

## 5. Integrasi dengan AG-UI Components

- Komponen AG-UI harus menerima props:
  - `state` → hasil dari business binding
  - `actions` → fungsi domain
  - `agentContext?` → metadata dari Agent runtime

## 6. Dokumentasi & Storybook

Setiap integrasi UI harus memiliki Storybook dengan contoh real data mock dari business state.
