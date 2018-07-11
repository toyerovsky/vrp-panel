import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';
import { AccountService } from '../../service/account.service';
import { AccountModel } from '../../models/AccountModel';

export class UrlNode {
  displayName: string;
  icon: string;
  requiredRank?: string;
  children?: UrlNode[];
  src?: string;
}

export class UrlFlatNode {
  constructor(
    public expandable: boolean, public displayName: string, public icon: string, public level: number, public src?: string) { }
}

const TREE_DATA: UrlNode[] = [
  {
    displayName: 'Strona startowa',
    icon: 'dashboard',
    src: '/player/characters'
  },
  {
    displayName: 'Zarządzaj grupami',
    icon: 'business',
    src: '/player/characters'
  },
  {
    displayName: 'Panel admistracyjny',
    icon: 'security',
    children: [{
      displayName: 'Postacie',
      src: '/admin/characters'
    }]
  },
  {
    displayName: 'Zgłoszenia',
    icon: 'chat',
    src: '/player/characters'
  },
  {
    displayName: 'Moje konto',
    icon: 'person',
    src: '/admin/characters'
  }
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private treeControl: FlatTreeControl<UrlFlatNode>;
  private treeFlattener: MatTreeFlattener<UrlNode, UrlFlatNode>;
  private dataSource: MatTreeFlatDataSource<UrlNode, UrlFlatNode>;
  private _accountModel: AccountModel;

  constructor(private _accountService: AccountService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<UrlFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
  }
  transformer = (node: UrlNode, level: number) => {
    return new UrlFlatNode(!!node.children, node.displayName, node.icon, level, node.src);
  }

  private _getLevel = (node: UrlFlatNode) => node.level;

  private _isExpandable = (node: UrlFlatNode) => node.expandable;

  private _getChildren = (node: UrlNode): Observable<UrlNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: UrlFlatNode) => _nodeData.expandable;

  ngOnInit() {
    this._accountService.getById(this._accountService.currentUserId).subscribe(account => {
      this._accountModel = account;
    });
  }
}
