'use client'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// Component Imports
import Pricing from '@components/pricing'

const PricingDialog = ({ open, setOpen, data }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={open}
      onClose={() => setOpen(false)}
      scroll='body'
      closeAfterTransition={false}
    >
      <DialogContent className='sm:p-16'>
        <IconButton className='absolute block-start-4 inline-end-4' onClick={() => setOpen(false)}>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <Pricing data={data} />
      </DialogContent>
    </Dialog>
  )
}

export default PricingDialog
