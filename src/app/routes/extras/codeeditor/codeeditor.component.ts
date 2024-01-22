import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from '@circlon/angular-tree-component';
import * as CodeMirror from 'codemirror';

import { SettingsService } from '../../../core/settings/settings.service';

@Component({
    selector: 'app-codeeditor',
    templateUrl: './codeeditor.component.html',
    styleUrls: ['./codeeditor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CodeeditorComponent implements OnInit, OnDestroy {

    nodes: any[] = [];
    customTemplateStringOptions = {
        isExpandedField: 'expanded',
    };

    @ViewChild('editor', { static: true }) editor: any;
    instance: any;
    editorThemes = ['3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix', 'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'];
    editorOpts = {
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true,
        theme: 'mbo',
        viewportMargin: Infinity
    };
    linkForThemes: any = null;
    code = '// Open a file from the left menu \n' +
    '// It will be requested to the server and loaded into the editor\n' +
    '// Also try adding a New File from the toolbar\n';

    constructor(public settings: SettingsService, public http: HttpClient) {
        this.settings.setLayoutSetting('useFullLayout', true);
        this.settings.setLayoutSetting('hiddenFooter', true);
        this.settings.setLayoutSetting('isCollapsed', true);

        this.http.get<any>('assets/codemirror/filetree.json')
            .subscribe(data => this.nodes = data);

    }

    ngOnInit() {
        this.instance = CodeMirror.fromTextArea(this.editor.nativeElement, this.editorOpts);
        this.updateEditor();
        this.instance.on('change', () => {
            this.code = this.instance.getValue();
        });
        this.loadTheme(); // load default theme
    }

    updateEditor() {
        this.instance.setValue(this.code);
    }

    loadTheme() {
        let themesBase = 'assets/codemirror/theme/';

        if (!this.linkForThemes) {
            this.linkForThemes = this.createCSS(themesBase + this.editorOpts.theme + '.css');
        }
        else {
            this.linkForThemes.setAttribute('href', themesBase + this.editorOpts.theme + '.css');
        }
        this.instance.setOption('theme', this.editorOpts.theme);
    };

    createCSS(path) {
        let link = document.createElement('link');
        link.href = path
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = 'cm_theme';

        return document.getElementsByTagName('head')[0].appendChild(link);
    }

    onSelectFile($ev) {
        let sourcesBase = 'assets/codemirror/';
        let node = $ev.node;

        if (node.data.path) {
            this.http.get(sourcesBase + node.data.path, { responseType: 'text' })
                .subscribe(data => {
                    console.log('Loaded.. ' + node.data.path);

                    this.code = data; // set the new code into the editor
                    this.updateEditor();

                    this.editorOpts.mode = this.detectMode(node.data.path);
                    console.log('Mode is: ' + this.editorOpts.mode);
                });
        }
    }

    detectMode(file) {
        let ext = file.split('.');
        ext = ext ? ext[ext.length - 1] : '';
        switch (ext) {
            case 'html': return 'htmlmixed';
            case 'css': return 'css';
            default: return 'typescript';
        }
    }

    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }

    addNode(tree) {
        this.nodes[0].children.push({
            'name': 'another.html',
            'path': 'source/another.html'
        });
        tree.treeModel.update();
    }

    ngOnDestroy() {
        this.settings.setLayoutSetting('useFullLayout', false);
        this.settings.setLayoutSetting('hiddenFooter', false);
        this.settings.setLayoutSetting('isCollapsed', false);

        // remove link tag
        this.linkForThemes.parentNode.removeChild(this.linkForThemes);
    }

}
