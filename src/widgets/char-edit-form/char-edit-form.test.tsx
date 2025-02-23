import type { CharGetResponse } from 'entities/char'
import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { CharEditService } from 'features/char'
import { act } from 'react'
import { silentSetState } from 'shared/use-service'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CharEditForm } from './char-edit-form'

describe('charEditForm', () => {
  const mockService = new CharEditService({ name: 'Luke Skywalker', gender: 'Male' } as CharGetResponse)
  vi.spyOn(mockService, 'handleSave').mockImplementation(() => void 0)
  vi.spyOn(mockService, 'handleCancel').mockImplementation(() => void 0)

  afterEach(() => {
    vi.clearAllMocks()

    silentSetState(() => {
      mockService.reset()
    })
  })

  it('should render input fields based on service fields', () => {
    render(<CharEditForm service={mockService} />, { wrapper: MantineProvider })

    const nameField = screen.getByLabelText('name')
    const genderField = screen.getByLabelText('gender')

    expect(nameField).not.toBeNull()
    expect(genderField).not.toBeNull()

    expect(screen.getByDisplayValue('Luke Skywalker')).not.toBeNull()
    expect(screen.getByDisplayValue('Male')).not.toBeNull()
  })

  it('should call handleSave when save button is clicked', () => {
    render(<CharEditForm service={mockService} />, { wrapper: MantineProvider })

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockService.handleSave).toHaveBeenCalled()
  })

  it('should call handleCancel when cancel button is clicked', () => {
    render(<CharEditForm service={mockService} />, { wrapper: MantineProvider })

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(mockService.handleCancel).toHaveBeenCalled()
  })

  it('should be able to edit fields and give changed value from service', async () => {
    render(<CharEditForm service={mockService} />, { wrapper: MantineProvider })

    // Find the input fields
    const nameField = screen.getByLabelText('name')
    const genderField = screen.getByLabelText('gender')

    // Simulate typing new values in the fields
    act(() => {
      fireEvent.change(nameField, { target: { value: 'Darth Vader' } })
      fireEvent.change(genderField, { target: { value: 'Female' } })
    })

    // Ensure the `setState` method has been called with the updated values
    expect(mockService.getValue()).toEqual({
      name: 'Darth Vader',
      gender: 'Female',
    })

    act(() => {
      mockService.reset()
    })

    expect(mockService.getValue()).toEqual({
      name: 'Luke Skywalker',
      gender: 'Male',
    })
  })
})
