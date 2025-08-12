import MentionList, { MentionListRef } from '@/components/tiptap-node/mention-node'
import { computePosition, flip, offset, shift } from '@floating-ui/dom'
import { MentionNodeAttrs } from '@tiptap/extension-mention'
import { Editor, posToDOMRect, ReactRenderer } from '@tiptap/react'
import { SuggestionOptions } from '@tiptap/suggestion'

const updatePosition = (
  editor: Editor,
  element: HTMLElement,
) => {
  const virtualEl = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualEl, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [offset(4), shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

export type SuggestionType = Omit<SuggestionOptions<any, MentionNodeAttrs>, 'editor'>

export const defaultMentionOptions: Partial<SuggestionType> = {
  render: () => {
    let component: ReactRenderer<MentionListRef, any>

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
          
        })

        if (!props.clientRect) return

        const el = component.element as HTMLElement
        el.setAttribute('data-type', 'mention-list')
        el.setAttribute('data-state', 'open')
        el.setAttribute('style', 'position: absolute;')

        document.body.appendChild(el)
        updatePosition(props.editor, el)
      },

      onUpdate(props) {
        component.updateProps(props)
        if (!props.clientRect) return

        updatePosition(props.editor, component.element as HTMLElement)
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          component.destroy()
          return true
        }
        return component.ref?.onKeyDown(props) ?? false
      },

      onExit() {
        (component.element as HTMLElement).remove()
        component.destroy()
      },
    }
  },
}
const mentionOptions: SuggestionType = {
  ...defaultMentionOptions,
  char: '@',
  allowSpaces: false,
  allowToIncludeChar: false,
  allowedPrefixes: [' '],
  items: async ({ query }: { query: string }) => {
    // Simulate an API call to fetch mention items based on the query
    // In a real application, replace this with an actual API call
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    return [
      'Kanak Kholwal',
      'John Doe',
      'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall',
      'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano',
      'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John',
      'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez',
      'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke',
      'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet'
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },

}

export default [mentionOptions]
