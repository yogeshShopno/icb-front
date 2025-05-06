// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'

// Slice Imports
import { moveEmailsToFolder, navigateEmails, toggleLabel } from '@/redux-store/slices/email'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import OptionMenu from '@core/components/option-menu'
import DirectionalIcon from '@components/DirectionalIcon'
import MailCard from './MailCard'

// Styles Imports
import styles from './styles.module.css'

// Data Imports
import { labelColors } from './SidebarLeft'

const ScrollWrapper = ({ children, isBelowLgScreen }) => {
  if (isBelowLgScreen) {
    return <div className='bs-full overflow-y-auto overflow-x-hidden bg-actionHover'>{children}</div>
  } else {
    return (
      <PerfectScrollbar className='bg-actionHover' options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    )
  }
}

const DetailsDrawer = styled('div')(({ drawerOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  blockSize: '100%',
  inlineSize: '100%',
  position: 'absolute',
  top: 0,
  right: drawerOpen ? 0 : '-100%',
  zIndex: 11,
  overflow: 'hidden',
  background: 'var(--mui-palette-background-paper)',
  transition: 'right 0.3s ease'
}))

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pli-5'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('ri-bold', { 'text-textPrimary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('ri-underline', { 'text-textPrimary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('ri-italic', { 'text-textPrimary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('ri-strikethrough', { 'text-textPrimary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i className={classnames('ri-align-left', { 'text-textPrimary': !editor.isActive({ textAlign: 'left' }) })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('ri-align-center', {
            'text-textPrimary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('ri-align-right', {
            'text-textPrimary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('ri-align-justify', {
            'text-textPrimary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

const MailDetails = props => {
  // Props
  const {
    drawerOpen,
    setDrawerOpen,
    isBelowSmScreen,
    isBelowLgScreen,
    currentEmail,
    emails,
    folder,
    label,
    dispatch,
    handleSingleEmailDelete,
    handleToggleIsReadStatus,
    handleToggleStarEmail
  } = props

  // States
  const [showReplies, setShowReplies] = useState(false)
  const [reply, setReply] = useState(false)

  // Handle navigation between emails and reset reply state
  const handleEmailNavigation = type => {
    dispatch(navigateEmails({ type, emails, currentEmailId: currentEmail?.id }))

    if (reply) {
      setReply(false)
    }
  }

  // Close drawer and reset reply state
  const handleCloseDrawer = () => {
    setDrawerOpen(false)

    if (reply) {
      setReply(false)
    }
  }

  // Move all selected emails to spam
  const handleMoveAllToSpam = () => {
    dispatch(moveEmailsToFolder({ emailIds: [currentEmail?.id], folder: 'spam' }))
    setDrawerOpen(false)
  }

  // Move all selected emails to inbox
  const handleMoveAllToInbox = () => {
    dispatch(moveEmailsToFolder({ emailIds: [currentEmail?.id], folder: 'inbox' }))
    setDrawerOpen(false)
  }

  // Handle click on label option from menu list
  const handleLabelClick = value => {
    dispatch(toggleLabel({ emailIds: [currentEmail?.id], label: value }))
    label === value && setDrawerOpen(false)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your message...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    immediatelyRender: false
  })

  return (
    <DetailsDrawer drawerOpen={drawerOpen}>
      {currentEmail && (
        <>
          <div className='plb-4 pli-5'>
            <div className='flex justify-between gap-2'>
              <div className='flex gap-4 items-center overflow-hidden'>
                <IconButton onClick={handleCloseDrawer}>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                </IconButton>
                <div className='flex items-center flex-wrap gap-2 overflow-hidden'>
                  <Typography noWrap>{currentEmail.subject}</Typography>
                  <div className='flex items-center flex-wrap gap-2'>
                    {currentEmail.labels && currentEmail.labels.length
                      ? currentEmail.labels.map(label => {
                          return (
                            <Chip
                              key={label}
                              variant='tonal'
                              size='small'
                              label={label}
                              color={labelColors[label].color}
                              className='capitalize'
                            />
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <IconButton disabled={currentEmail.id === emails[0].id} onClick={() => handleEmailNavigation('prev')}>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                </IconButton>
                <IconButton
                  disabled={currentEmail.id === emails[emails.length - 1].id}
                  onClick={() => handleEmailNavigation('next')}
                >
                  <DirectionalIcon ltrIconClass='ri-arrow-right-s-line' rtlIconClass='ri-arrow-left-s-line' />
                </IconButton>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between gap-4 plb-2 pli-5 border-y'>
            <div className='flex gap-1'>
              <Tooltip title={folder === 'trash' ? 'Delete' : 'Move to trash'} placement='top'>
                <IconButton
                  onClick={e => {
                    setDrawerOpen(false)
                    handleSingleEmailDelete(e, currentEmail.id)
                  }}
                >
                  <i className='ri-delete-bin-7-line' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Mark as unread' placement='top'>
                <IconButton
                  onClick={e => {
                    setDrawerOpen(false)
                    handleToggleIsReadStatus(e, currentEmail.id)
                  }}
                >
                  <i className='ri-mail-unread-line' />
                </IconButton>
              </Tooltip>
              {folder === 'inbox' && (
                <Tooltip title='Move to spam' placement='top'>
                  <IconButton onClick={handleMoveAllToSpam}>
                    <i className='ri-error-warning-line' />
                  </IconButton>
                </Tooltip>
              )}
              {folder === 'spam' && (
                <Tooltip title='Move to inbox' placement='top'>
                  <IconButton onClick={handleMoveAllToInbox}>
                    <i className='ri-inbox-line' />
                  </IconButton>
                </Tooltip>
              )}
              {folder === 'trash' && (
                <OptionMenu
                  tooltipProps={{ title: 'Move to folder', placement: 'top' }}
                  icon={<i className='ri-folder-3-line' />}
                  iconButtonProps={{ size: 'medium' }}
                  options={[
                    {
                      text: 'Spam',
                      icon: <i className='ri-error-warning-line mie-2' />,
                      menuItemProps: { onClick: handleMoveAllToSpam }
                    },
                    {
                      text: 'Inbox',
                      icon: <i className='ri-inbox-line mie-2' />,
                      menuItemProps: { onClick: handleMoveAllToInbox }
                    }
                  ]}
                />
              )}
              <OptionMenu
                tooltipProps={{ title: 'Toggle label', placement: 'top' }}
                icon={<i className='ri-price-tag-3-line' />}
                iconButtonProps={{ size: 'medium' }}
                options={Object.entries(labelColors).map(([key, value]) => ({
                  text: key.charAt(0).toUpperCase() + key.slice(1),
                  menuItemProps: { onClick: () => handleLabelClick(key) },
                  icon: <i className={`ri-circle-fill mie-2 text-xs text-${value.color}`} />
                }))}
              />
            </div>
            <div className='flex gap-1'>
              <IconButton
                onClick={e => {
                  handleToggleStarEmail(e, currentEmail.id)
                  folder === 'starred' && setDrawerOpen(false)
                }}
              >
                <i className={classnames('ri-star-line', { 'text-warning': currentEmail.isStarred })} />
              </IconButton>
              {currentEmail.replies.length ? (
                <IconButton onClick={() => setShowReplies(!showReplies)}>
                  <i
                    className={classnames({
                      'ri-expand-height-line': !showReplies,
                      'ri-contract-up-down-line': showReplies
                    })}
                  />
                </IconButton>
              ) : null}
              <IconButton>
                <i className='ri-more-2-line' />
              </IconButton>
            </div>
          </div>
          <ScrollWrapper isBelowLgScreen={isBelowLgScreen}>
            <div className='plb-5 pli-8 flex flex-col gap-4'>
              {currentEmail.replies.length && !showReplies ? (
                <Typography
                  variant='body1'
                  color='text.secondary'
                  className='self-center text-center cursor-pointer'
                  onClick={() => setShowReplies(true)}
                >
                  {`${currentEmail.replies.length} Earlier Messages`}
                </Typography>
              ) : null}
              {showReplies
                ? currentEmail.replies.map(reply => <MailCard key={reply.id} data={reply} isReplies={false} />)
                : null}

              <div>
                {!showReplies && currentEmail.replies.length ? (
                  <>
                    <div
                      className={classnames(styles.mailReplyLayer, styles.layer1)}
                      onClick={() => setShowReplies(true)}
                    />
                    <div
                      className={classnames(styles.mailReplyLayer, styles.layer2)}
                      onClick={() => setShowReplies(true)}
                    />
                  </>
                ) : null}
                <MailCard data={currentEmail} isReplies={true} />
                <Card className='border mbs-4'>
                  {!reply ? (
                    <CardContent>
                      <Typography>
                        Click here to
                        <span className='text-primary cursor-pointer mli-1' onClick={() => setReply(true)}>
                          Reply
                        </span>
                        or
                        <span className='text-primary cursor-pointer mis-1'>Forward</span>
                      </Typography>
                    </CardContent>
                  ) : (
                    <div className='flex flex-col gap-y-6'>
                      <CardContent className='pbe-0'>
                        <Typography color='text.primary'>{`Reply to ${currentEmail.from.name}`}</Typography>
                      </CardContent>
                      <div>
                        <EditorToolbar editor={editor} />
                        <EditorContent editor={editor} className='overflow-y-auto' />
                      </div>
                      <CardActions className='pbs-0'>
                        <div className='flex items-center justify-end gap-4'>
                          <IconButton>
                            <i className='ri-delete-bin-7-line' onClick={() => setReply(false)} />
                          </IconButton>
                          {isBelowSmScreen ? (
                            <CustomIconButton color='secondary'>
                              <i className='ri-attachment-2' />
                            </CustomIconButton>
                          ) : (
                            <Button color='secondary' startIcon={<i className='ri-attachment-2' />}>
                              Attachments
                            </Button>
                          )}
                          {isBelowSmScreen ? (
                            <CustomIconButton variant='contained' color='primary'>
                              <i className='ri-send-plane-line' />
                            </CustomIconButton>
                          ) : (
                            <Button variant='contained' color='primary' endIcon={<i className='ri-send-plane-line' />}>
                              Send
                            </Button>
                          )}
                        </div>
                      </CardActions>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </ScrollWrapper>
        </>
      )}
    </DetailsDrawer>
  )
}

export default MailDetails
