<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Guide speech

- Spoken words are derived from the on-screen script through `speechText()` in `src/lib/portfolio-data.ts`; pronunciation respellings live only in that map so the visible copy stays correct. Why: caption and voice must never drift apart.
- Intro lines advance only after the line is typed out and the utterance ends, with a timeout guard, so a slower voice can never truncate a line.
- `GuideProvider` is mounted in `src/routes/__root.tsx` around `<Outlet />`, never inside a page route, and `useGuide()` returns a silent idle state instead of throwing. Why: a route-file hot reload must never blank the screen with a missing-provider error.
