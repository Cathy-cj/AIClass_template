// lessons/permutation-race/config.js
;(function () {
  function notify(message) {
    if (window.toast && typeof window.toast.show === 'function') {
      window.toast.show(message)
    }
  }

  function sameText(a, b) {
    return String(a == null ? '' : a).trim() === String(b == null ? '' : b).trim()
  }

  function checkSimpleValue(value, block) {
    if (sameText(value, block.answer)) {
      notify(block.correctText || '回答正确')
      return true
    }
    notify(block.errorText || '再想一想')
    return false
  }

  function checkPermutationSymbol(value, block) {
    var slots = block.slots || []
    var ok = slots.every(function (slot) {
      return value && sameText(value[slot.id], slot.answer)
    })
    notify(ok ? block.correctText : block.errorText)
    return ok
  }

  function checkPermutationReason(value, block) {
    var text = String(value || '')
    var groups = block.keywordGroups || []
    var hits = groups.filter(function (group) {
      return group.some(function (keyword) {
        return text.indexOf(keyword) >= 0
      })
    }).length
    var ok = hits >= (block.minKeywordGroups || 1)
    notify(ok ? block.correctText : block.errorText)
    return ok
  }

  window.PERMUTATION_RACE_CONFIG = {
    meta: {
      id: 'permutation-race',
      title: '排列问题：运动会前三名',
      tag: '排列',
      question: '不考虑并列名次，一共有多少种不同的前三名结果？'
    },
    layout: {
      theme: 'grid-paper'
    },
    top: {
      tag: '排列问题',
      title: '学校运动会 100 米比赛共有 8 名同学参加。比赛结束后，要决出第 1 名、第 2 名、第 3 名。',
      lines: ['如果不考虑并列名次，一共有多少种不同的前三名结果？']
    },
    handlers: {
      checkTotalObjects: checkSimpleValue,
      checkPickCount: checkSimpleValue,
      checkPermutationReason: checkPermutationReason,
      checkPermutationSymbol: checkPermutationSymbol,
      checkPermutationFormula: function (value, block) {
        var text = String(value || '').replace(/\s/g, '')
        var expressionOk = text.indexOf('8×7×6') >= 0 || text.indexOf('8*7*6') >= 0 || text.indexOf('8x7x6') >= 0
        var resultOk = text.indexOf('336') >= 0
        var ok = expressionOk && resultOk
        notify(ok ? block.correctText : block.errorText)
        return ok
      }
    },
    steps: [
      {
        id: 1,
        section: { tag: '第一步', title: '找出总对象数' },
        push: [
          {
            type: 'clickText',
            interactive: true,
            prompt: '请点击题目中表示“一共有多少个对象可以选择”的信息。',
            segments: [
              { text: '学校运动会 ' },
              { text: '100 米', value: '100', clickable: true },
              { text: ' 比赛共有 ' },
              { text: '8 名同学', value: '8', clickable: true },
              { text: ' 参加。比赛结束后，要决出 ' },
              { text: '第 1 名', value: '1', clickable: true },
              { text: '、' },
              { text: '第 2 名', value: '2', clickable: true },
              { text: '、' },
              { text: '第 3 名', value: '3', clickable: true },
              { text: '。' }
            ],
            answer: '8',
            actions: ['reset', 'submit'],
            requiredText: '请先点击题目中的关键信息',
            correctText: '很好！这道题一共有 8 名同学参加比赛，所以我们一共有 8 个对象可以选择。这里的对象就是参加比赛的同学。',
            errorText: '再找一找：我们现在要先确定“总共有多少人可以参与排名”。题目中哪一部分告诉了我们参赛总人数？',
            onSubmit: 'checkTotalObjects'
          }
        ]
      },
      {
        id: 2,
        section: { tag: '第二步', title: '确定要选出几个' },
        push: [
          { type: 'text', lines: ['很好！这道题一共有 8 名同学参加比赛，所以我们一共有 8 个对象可以选择。这里的对象就是参加比赛的同学。'] },
          {
            type: 'fill',
            interactive: true,
            submitText: '提交',
            requiredText: '请填写要选出的名次个数',
            answer: '3',
            correctText: '很好！第 1 名、第 2 名、第 3 名一共有 3 个名次，所以需要选出 3 名同学来排列。',
            errorText: '再想一想：只要第 1 名、第 2 名、第 3 名，一共有几个位置？',
            onSubmit: 'checkPickCount',
            parts: [
              { type: 'text', value: '题目要决出第 1 名、第 2 名、第 3 名，所以需要从 8 名同学中选出 ' },
              { type: 'blank', id: 'pick-count', width: 56 },
              { type: 'text', value: ' 名同学来排名。' }
            ]
          }
        ]
      },
      {
        id: 3,
        section: { tag: '第三步', title: '判断是不是排列问题' },
        push: [
          { type: 'text', lines: ['很好！第 1 名、第 2 名、第 3 名一共有 3 个名次，所以需要选出 3 名同学来排列。'] },
          {
            type: 'oralInput',
            interactive: true,
            badge: '说一说',
            question: '这道题是不是排列问题？为什么？',
            placeholder: '可以从“是否有顺序”“名次变化结果是否变化”来说明。',
            rows: 3,
            keywordGroups: [
              ['排列', '是'],
              ['顺序', '名次', '结果不同', '名次变了']
            ],
            minKeywordGroups: 2,
            correctText: '说得很好！第 1 名、第 2 名、第 3 名是不同的位置，顺序变了，比赛结果也会变。',
            errorText: '可以这样想：小明第 1、小红第 2，和小红第 1、小明第 2，这两个结果一样吗？',
            onSubmit: 'checkPermutationReason'
          }
        ]
      },
      {
        id: 4,
        section: { tag: '第四步', title: '写出排列符号' },
        push: [
          { type: 'text', lines: ['这道题是排列问题，因为前三名有明确顺序，同样三名同学如果名次不同，结果也不同。'] },
          {
            type: 'dragPermutation',
            interactive: true,
            prompt: '这道题是从 8 名同学中选出 3 名，请把数字拖到排列符号中正确的位置。',
            cards: ['8', '3'],
            slots: [
              { id: 'upper', label: '上标：要取出几个来排列', answer: '3' },
              { id: 'lower', label: '下标：总共有几个对象', answer: '8' }
            ],
            symbol: 'A',
            requiredText: '请把 8 和 3 都放到排列符号中',
            correctText: '很好！这道题可以写成 8A3。下面的 8 表示一共有 8 名同学，上面的 3 表示要选出 3 名同学来排前三名。',
            errorText: '再想一想：排列符号 nAm 中，下面的 n 表示总对象数，上面的 m 表示要取出几个来排列。',
            onSubmit: 'checkPermutationSymbol'
          }
        ]
      },
      {
        id: 5,
        section: { tag: '第五步', title: '计算排列数并得到答案' },
        push: [
          { type: 'text', lines: ['很好！这道题可以写成 8A3，表示从 8 名同学中选出 3 名来排列。'] },
          {
            type: 'oralInput',
            interactive: true,
            badge: '口答',
            question: '请你计算出一共有多少种排列方式：8A3 =',
            placeholder: '例如：8A3=8×7×6=336',
            rows: 3,
            requiredText: '请先写出你的计算过程和结果',
            correctText: '非常好！8A3表示从 8 名同学中取出 3 名来排列，所以要从 8 开始往下乘 3 个数：8A3=8×7×6=336。也可以这样理解：第 1 名有 8 种可能，第 2 名还剩 7 种可能，第 3 名还剩 6 种可能，所以一共有 336 种不同的前三名结果。',
            errorText: '再想一想，排列公式的计算方法是“从总数开始往下乘，要排几个位置，就乘几个数”。这道题一共有 8 名同学，要排 3 个名次，所以应该从 8 开始连续乘几个数？',
            onSubmit: 'checkPermutationFormula'
          },
          {
            type: 'solveStep',
            index: 1,
            title: '理解计算过程',
            lines: [
              '第 1 名有 8 种可能。',
              '第 2 名还剩 7 种可能。',
              '第 3 名还剩 6 种可能。',
              '所以一共有 8×7×6=336 种不同的前三名结果。'
            ]
          }
        ]
      }
    ]
  }
})()
