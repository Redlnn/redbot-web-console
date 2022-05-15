<template>
  <div>
    <el-button @click="refresh">刷新</el-button>
    <div ref="output" style="margin: auto 25px" v-html="code"></div>
    <!-- <div ref="ot" style="margin: auto 25px"></div> -->
    <!-- <Code :rawcode="rawcode" :lang="lang"></Code> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getHighlighter, setCDN } from 'shiki'
import * as languages from '@/assets/languages'
import type { HighlightLanguage } from '@/assets/languages'
// import Code from '../components/CodeHighlight.vue'

// const shiki = require('shiki') // eslint-disable-line

setCDN('/shiki-dist/')
// setCDN('https://cdn.jsdelivr.net/npm/shiki/')

const theme = getHighlighter({ theme: 'one-dark-Pro' })
// window['shiki'] = shiki
// window['theme'] = theme

type HighlightLinesRange = [number, number]
const languagesMap: Record<string, HighlightLanguage> = Object.values(languages).reduce((result, item) => {
  item.aliases.forEach((alias) => {
    result[alias] = item
  })
  return result
}, {})

export default defineComponent({
  // components: {
  //   Code,
  // },
  data() {
    return {
      code: '',
      highlightLines: ['15-18', '20-21'] as string[],
      lang: 'py',
      rawcode: `\
import asyncio

from graia.ariadne.app import Ariadne
from graia.ariadne.model import MiraiSession
from graia.saya import Saya
from graia.saya.builtins.broadcast import BroadcastBehaviour

app = Ariadne(
    MiraiSession(
        host="http://localhost:8080",
        verify_key="GraiaxVerifyKey",
        account=1919810,
    ),
)
saya = app.create(Saya)
saya.install_behaviours(
    app.create(BroadcastBehaviour)
)

with saya.module_context():
    saya.require("modules.ero")

app.launch_blocking()`,
    }
  },
  // watch: {
  //   code() {},
  // },
  async mounted() {
    await this.refresh()
  },
  methods: {
    async refresh() {
      let code = (await theme).codeToHtml(this.rawcode, { lang: this.lang })
      const lines = (code += '\n').split('\n').slice(0, -1)
      const highlightLinesRanges = this.resolveHighlightLines()
      const highlightLinesCode = lines
        .map((_, index) => {
          if (this.isHighlightLine(index + 1, highlightLinesRanges)) {
            return '<div class="highlight-line">&nbsp;</div>'
          }
          return '<br>'
        })
        .join('')
      code = `${code}<div class="highlight-lines">${highlightLinesCode}</div>`
      const lineNumbersCode = lines.map((_, index) => `<span class="line-number">${index + 1}</span><br>`).join('')
      code = `${code}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`
      const language = this.resolveLanguage()
      code = `<div class="language-${language.name} ext-${language.ext} line-numbers">${code}</div>`
      this.code = code
    },
    resolveHighlightLines() {
      return this.highlightLines.map((range) => {
        const tmp = range.split('-')
        if (tmp.length === 1) {
          tmp.push(range[0])
        }
        return tmp.map((str) => Number.parseInt(str, 10)) as HighlightLinesRange
      })
    },
    isHighlightLine(lineNumber: number, ranges: HighlightLinesRange[]) {
      return ranges.some(([start, end]) => lineNumber >= start && lineNumber <= end)
    },
    resolveLanguage(): HighlightLanguage {
      const alias = this.lang.match(/^([a-zA-Z]+)/)?.[1] || 'text'
      return (
        languagesMap[alias] ?? {
          name: alias,
          ext: alias,
          aliases: [alias],
        }
      )
    },
  },
})
</script>

<style lang="scss">
$codeLang: 'c' 'cpp' 'cs' 'css' 'dart' 'docker' 'fs' 'go' 'html' 'java' 'js' 'json' 'kt' 'less' 'makefile' 'md' 'php'
  'py' 'rb' 'rs' 'sass' 'scss' 'sh' 'styl' 'ts' 'toml' 'vue' 'yml' !default;

// .shiki {
//   position: relative;
//   padding: 1rem;
//   border-radius: 6px;
//   transition: all 0.3s ease;
// }

:root {
  --code-bg-color: #282c34;
  --code-ln-color: #9e9e9e;
  --code-hl-bg-color: rgba(0, 0, 0, 0.66);
  --code-ln-wrapper-width: 3.5rem;
  --font-family-code: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}

div[class*='language-'],
code[class*='language-'],
pre[class*='language-'] {
  font-family: var(--font-family-code);
  font-size: 0.85rem;
  text-align: left;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre,
pre[class*='language-'] {
  line-height: 1.4rem;
  padding: 1.3rem 1.5rem;
  margin: 0.85rem 0;
  border-radius: 6px;
  overflow: auto;

  code {
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    overflow-wrap: unset;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }
}

.line-number {
  font-family: var(--font-family-code);
}

pre[class*='language-'] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: var(--code-bg-color);
}

:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

div[class*='language-'] {
  position: relative;
  background-color: var(--code-bg-color);
  border-radius: 6px;

  &::before {
    position: absolute;
    z-index: 3;
    top: 0.8em;
    right: 1em;
    font-size: 0.75rem;
    color: var(--code-ln-color);
  }

  pre,
  pre[class*='language-'] {
    // force override the background color to be compatible with shiki
    background: transparent !important;
    position: relative;
    z-index: 1;
  }

  .highlight-lines {
    user-select: none;
    padding-top: 1.3rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 1.4rem;

    .highlight-line {
      background-color: var(--code-hl-bg-color);
    }
  }

  &:not(.line-numbers) {
    .line-numbers {
      display: none;
    }
  }

  &.line-numbers {
    .highlight-lines .highlight-line {
      position: relative;

      &::before {
        content: ' ';
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        display: block;
        width: var(--code-ln-wrapper-width);
        height: 100%;
      }
    }

    pre {
      margin-left: var(--code-ln-wrapper-width);
      padding-left: 1rem;
      vertical-align: middle;
    }

    .line-numbers {
      position: absolute;
      top: 0;
      width: var(--code-ln-wrapper-width);
      text-align: center;
      color: var(--code-ln-color);
      padding-top: 1.25rem;
      line-height: 1.4rem;

      br {
        user-select: none;
      }

      .line-number {
        position: relative;
        z-index: 3;
        user-select: none;
        font-size: 0.85em;
        line-height: 0;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: var(--code-ln-wrapper-width);
      height: 100%;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid var(--code-hl-bg-color);
    }
  }
}

@each $lang in $codeLang {
  div[class*='language-'].ext-#{$lang} {
    &:before {
      content: '' + $lang;
    }
  }
}

// code {
//   counter-reset: step;
//   counter-increment: step 0;
// }

// code .line::before {
//   content: counter(step);
//   counter-increment: step;
//   width: 1.5rem;
//   margin-right: 2rem;
//   // display: inline-block;
//   text-align: center;
//   color: #aaaaaaaa;
// }

// pre::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 3.5rem;
//   height: 100%;
//   border-radius: 6px 0 0 6px;
//   border-right: 1px solid #000;
// }
</style>
