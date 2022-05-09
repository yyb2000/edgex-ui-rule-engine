<template>
  <div>
    <textarea ref="sqlEditor" class="codesql"></textarea>
  </div>
</template>

<script>
// 引入核心样式
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/theme/monokai.css";
// 引入全局实例
const CodeMirror = require("codemirror/lib/codemirror");
import {format} from 'sql-formatter';
// import sqlFormatter from 'sql-formatter'
// const sqlformatter = require("sql-formatter");
//
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");

// sql语言包
require("codemirror/mode/sql/sql");
// 代码自动提示插件
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");

export default {
  name: "SqlEditor",
  props: {
    // 接收父组件传值
    value: {
      type: String,
      default: ""
    },
    sqlStyle: {
      type: String,
      default: "default"
    },
    readOnly: {
      type: [Boolean, String]
    },
    // 父组件将表结构传给编辑器，实现自动提示表名和字段名的功能
    tables: {
      type: Object,
      default: () => {}
    },
    editorHeight: {
      type: Number,
      default: 450
    },
    tableInfo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editor: null
    };
  },
  computed: {
    // 将编辑器中的值赋给newVal变量
    newVal() {
      if (this.editor) {
        return this.editor.getValue();
      } else {
        return "";
      }
    }
  },
  watch: {
    // 监听newVal值的变化，通过getValue方法获取到值并传递给父组件
    newVal() {
      // console.log(newV, oldV)
      if (this.editor) {
        this.$emit("changeTextarea", this.editor.getValue());
      }
    },
    // 将value赋值给编辑器配置项改变值中的value
    value(newV) {
      //
      // console.log("### 新值" + newV)
      // console.log("### 旧值" + oldV)
      if (this.editor) {
        let cursor = this.editor.doc.getCursor();
        if (newV === "") {
          this.editor.setValue("");
          this.editor.setCursor(cursor);
        } else {
          this.editor.setValue(newV);
          this.editor.setCursor(cursor);
        }
      }
    },
    // tableInfo(val) {
    //   if(val) {
    //     let getCursor = this.editor.doc.getCursor()
    //     let pos = {};
    //     pos.line = getCursor.line;
    //     pos.ch = getCursor.ch;
    //     this.editor.doc.replaceRange(" "+ val +" ",pos)
    //   }
    // },
    // 根据父组件中的高度来给editor动态设置高度
    editorHeight(newV) {
      this.editor.setSize("100%", newV);
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.sqlEditor, {
      // value: this.value,
      mode: { name: "text/x-hive" },
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      cursorHeight: 1,
      lineWrapping: true,
      readOnly: this.readOnly,
      theme: "monokai",
      autofocus: true,
      extraKeys: {
        "'a'": this.completeAfter,
        "'b'": this.completeAfter,
        "'c'": this.completeAfter,
        "'d'": this.completeAfter,
        "'e'": this.completeAfter,
        "'f'": this.completeAfter,
        "'g'": this.completeAfter,
        "'h'": this.completeAfter,
        "'i'": this.completeAfter,
        "'j'": this.completeAfter,
        "'k'": this.completeAfter,
        "'l'": this.completeAfter,
        "'m'": this.completeAfter,
        "'n'": this.completeAfter,
        "'o'": this.completeAfter,
        "'p'": this.completeAfter,
        "'q'": this.completeAfter,
        "'r'": this.completeAfter,
        "'s'": this.completeAfter,
        "'t'": this.completeAfter,
        "'u'": this.completeAfter,
        "'v'": this.completeAfter,
        "'w'": this.completeAfter,
        "'x'": this.completeAfter,
        "'y'": this.completeAfter,
        "'z'": this.completeAfter,
        "'.'": this.completeAfter,
        "Ctrl-Alt-L": this.format
      }
      //   hintOptions: {
      //     tables: this.dataBaseTips,
      //   },
    });

    this.editor.setSize("100%", this.editorHeight);
    // 监听inputRead事件，实现代码自动提示功能

    // 监听光标事件，获取光标选中的内容
    this.editor.on("cursorActivity", () => {
      // this.editor.showHint();
      let somethingSelected = this.editor.doc.somethingSelected(); //是否有光标选中内容
      let getSelection = this.editor.doc.getSelection(); //光标选中内容
      this.$emit("getSelectContent", somethingSelected, getSelection);
    });

    // this.editor.on("keyup", function (cm ,e) {
    //   var arrows = [37, 38, 39, 40];
    //   if (arrows.indexOf(e) < 0) {
    //     this.editor.execCommand("autocomplete")
    //   }
    // });
  },

  methods: {
    // templateTypeToggle(template){
    //   if (template == 'EDGEX'){
    //     this.editor.setValue('CREATE STREAM EdgeXStream () WITH ( FORMAT = "JSON", TYPE = "edgex" )');
    //     console.log('3');
    //   }
    //   else if (template == 'CUSTOM'){
    //     this.editor.setValue('CREATE STREAM demo ( field1 bigint, field2 float ) WITH ( DATASOURCE = "", KEY = "", FORMAT = "JSON", CONF_KEY = "", TYPE = "edgex", STRICT_VALIDATION = "true", TIMESTAMP = "", TIMESTAMP_FORMAT = "", RETAIN_SIZE = "0", SHARED = "false" )');
    //   }
    //   else {
    //     this.editor.setValue('');
    //   }
    // },
    // edegxTemplate(){
    //   this.editor.setValue('CREATE STREAM EdgeXStream () WITH ( FORMAT = "JSON", TYPE = "edgex" )');
    //   console.log('1');
    // },
    // customTemplate(){
    //   this.editor.setValue('CREATE STREAM demo ( field1 bigint, field2 float ) WITH ( DATASOURCE = "", KEY = "", FORMAT = "JSON", CONF_KEY = "", TYPE = "edgex", STRICT_VALIDATION = "true", TIMESTAMP = "", TIMESTAMP_FORMAT = "", RETAIN_SIZE = "0", SHARED = "false" )');
    //   this.sqlformat();
    //   console.log('2');
    // },
    tableInfoChange(val) {
      if (val) {
        let getCursor = this.editor.doc.getCursor();
        let pos = {};
        pos.line = getCursor.line;
        pos.ch = getCursor.ch;
        this.editor.doc.replaceRange(" " + val + " ", pos);
      }
    },
    completeAfter(cm, pred) {
      if (!pred || pred())
        setTimeout(function() {
          if (!cm.state.completionActive)
            cm.showHint({
              completeSingle: false
            });
        }, 100);
      return CodeMirror.Pass;
    },

    sqlformat() {
      let sqlContent="";
      sqlContent=this.editor.getValue();
      /*将sql内容进行格式后放入编辑器中*/
      this.editor.setValue(format(sqlContent,{language:'postgresql'}));
    }
  }
};
</script>

<style scope>
.CodeMirror {
  height: auto;
  /* height: 450px!important; */
  /* width: 900px!important; */
}
.CodeMirror-cursors {
  visibility: visible !important;
  animation: cursorActive 1s infinite steps(1, start);
}
.cm-s-monokai .CodeMirror-cursor {
  border-left: 2px solid #d5690f !important;
}
@keyframes cursorActive {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>