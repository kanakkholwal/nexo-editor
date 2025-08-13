// MentionList.tsx
import { Button } from '@/components/tiptap-ui-primitive/button'
import { SuggestionProps } from '@tiptap/suggestion'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import "./mention-list.scss"

// Define the shape of methods exposed via ref
export interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

// const DefaultIcons = {
//   "@":AtSign,
//   "#":Hash
// }  as Record<string, React.ComponentType<SVGProps<SVGElement>>>

const MentionList = forwardRef<MentionListRef, SuggestionProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }
      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }
      if (event.key === 'Enter') {
        enterHandler()
        return true
      }
      return false
    },
  }))

  return (
    <div className="tiptap-dropdown-menu mention-list">
      {props.items.length ? (
        props.items.map((item, index) => (
          <Button
            type="button"
            data-style="ghost"
            data-active-state={index === selectedIndex ? "on" : "off"}
            role="button"
            tabIndex={-1}
            className={index === selectedIndex ? 'is-selected' : ''}
            key={index}
            onClick={() => selectItem(index)}
          >
            
            {item && <span className="tiptap-button-text">{item}</span>}
          </Button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  ) 
})

MentionList.displayName = 'MentionList'
export default MentionList
