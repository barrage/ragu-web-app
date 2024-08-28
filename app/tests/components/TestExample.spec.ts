import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import TestExample from '@/components/BarrageNuxtWelcome/components/TestExample.vue'

describe('helloWorld', () => {
  it('component renders Test Example properly', () => {
    const wrapper = mount(TestExample)
    expect(wrapper.text()).toContain('Hello Test Example')
  })
})
